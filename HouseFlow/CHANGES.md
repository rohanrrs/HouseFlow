# HouseFlow — Change Log

## Session: Bug Fixes & Architecture Completion

---

### 1. `pom.xml` — Fixed non-existent test dependencies

**What changed:** Replaced 4 bogus test dependency artifacts with the correct ones.

```xml
// BEFORE (all 4 of these do not exist in any Maven repository)
spring-boot-starter-data-jpa-test
spring-boot-starter-security-test
spring-boot-starter-validation-test
spring-boot-starter-webmvc-test

// AFTER
spring-boot-starter-test        (JUnit 5, Mockito, Spring Test)
spring-security-test            (MockMvc security support)
```

**Why:** The old dependencies would cause a build failure at `mvn compile` / `mvn test` because Maven cannot resolve artifacts that don't exist in any repository.

---

### 2. `SecurityConfig.java` — Fixed deprecated API

**What changed:** Updated CSRF configuration from the old chained API to the lambda DSL.

```java
// BEFORE (deprecated since Spring Security 6)
http.csrf().disable()
    .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

// AFTER
http.csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
```

**Why:** Spring Security 6 (used by Spring Boot 4.x) removed the old `csrf()` chained method. Using the deprecated form causes a compile error in newer versions.

---

### 3. `entity/User.java` — Fixed MySQL reserved table name conflict

**What changed:** Added `@Table(name = "users")` annotation.

```java
// BEFORE
@Entity
public class User { ... }
// Hibernate maps this to table: "user" — which is a MySQL system table

// AFTER
@Entity
@Table(name = "users")
public class User { ... }
```

**Why:** In MySQL, `user` is a built-in system table in the `mysql` schema. When Hibernate tries to create or update a table named `user`, it conflicts with the system table and throws a runtime error on startup.

---

### 4. `dto/RentDto.java` — Added missing rent breakdown fields

**What changed:** Added 4 fields that existed on the `Rent` entity but were absent from the DTO.

```java
// BEFORE
private double totalAmount;  // only total was exposed

// AFTER
private double baseRent;
private double electricity;
private double water;
private double serviceCharge;
private double totalAmount;
```

**Why:** The `Rent` entity stores a full itemised breakdown. The DTO is the API contract — without these fields, clients could never submit or receive the individual charge components, making the rent billing feature non-functional.

---

### 5. `dto/UserDto.java` — Added missing `phone` field

**What changed:** Added `phone` field to `UserDto`.

```java
// BEFORE
private Long id;
private String name;
private String email;
private String role;

// AFTER
private Long id;
private String name;
private String email;
private String phone;   // added
private String role;
```

**Why:** The `User` entity has a `phone` field. Omitting it from the DTO meant phone numbers could never be created or returned via the API. Note: `password` is intentionally kept out of the DTO to avoid exposing credentials in responses.

---

### 6. `service/BuildingService.java` — Added missing methods

**What changed:** Added `getBuildingById(Long id)` and `deleteBuilding(Long id)` to the interface.

**Why:** The interface only had `create` and `getAll`, making it inconsistent with every other service interface in the project (all of which had all 4 CRUD operations). Without these, there was no way to fetch or delete a single building.

---

### 7. `service/impl/BuildingServiceImpl.java` — Fixed missing `id` in response + implemented new methods

**What changed:**
- `createBuilding()` and `getAllBuildings()` now include `id` in the returned DTO.
- Implemented `getBuildingById()` and `deleteBuilding()`.

```java
// BEFORE — id was never set
BuildingDto response = new BuildingDto();
response.setName(saved.getName());
response.setAddress(saved.getAddress());

// AFTER — id is included
return new BuildingDto(saved.getId(), saved.getName(), saved.getAddress());
```

**Why:** Without the `id` in the response, clients receiving a created building had no way to reference it in subsequent requests (e.g., creating a floor under that building requires a `buildingId`). This broke the entire workflow from the very first API call.

---

### 8. All service interfaces — Standardised to use DTOs instead of entities

**What changed:** `FloorService`, `UnitService`, `TenantService`, `RentService`, `PaymentService`, `ExpenseService`, and `UserService` all had method signatures using raw JPA entities. These were all updated to use their corresponding DTOs.

```java
// BEFORE (example: FloorService)
Floor createFloor(Floor floor);
List<Floor> getAllFloors();
Floor getFloorById(Long id);

// AFTER
FloorDto createFloor(FloorDto dto);
List<FloorDto> getAllFloors();
FloorDto getFloorById(Long id);
```

**Why:** `BuildingService` (the only implemented service) already used DTOs. Using raw entities in service interfaces leaks the persistence model into the API layer — changes to the database schema then ripple directly into controller code. DTOs decouple the two layers. The inconsistency also caused the `PaymentServiceImpl` compile error (see below).

---

### 9. `service/impl/PaymentServiceImpl.java` — Fixed method name mismatch (compile error)

**What changed:** Complete rewrite. The old impl had wrong method names and was missing two required methods.

```java
// BEFORE — wrong names, wrong parameter type, missing methods
public PaymentDto create(PaymentDto dto) { ... }      // should be createPayment()
public List<PaymentDto> getAll() { ... }              // should be getAllPayments()
// getPaymentById() — MISSING
// deletePayment()  — MISSING

// AFTER — matches interface exactly
public PaymentDto createPayment(PaymentDto dto) { ... }
public List<PaymentDto> getAllPayments() { ... }
public PaymentDto getPaymentById(Long id) { ... }
public void deletePayment(Long id) { ... }
```

**Why:** A class that `implements` an interface must provide all methods with exact signatures. The mismatched names caused a compile error — `PaymentServiceImpl` would not compile, preventing the entire application from starting.

---

### 10. New files: 6 Service Implementations

**What was created:**

| File | Depends on |
|------|-----------|
| `FloorServiceImpl.java` | `FloorRepository`, `BuildingRepository` |
| `UnitServiceImpl.java` | `UnitRepository`, `FloorRepository` |
| `TenantServiceImpl.java` | `TenantRepository`, `UnitRepository` |
| `RentServiceImpl.java` | `RentRepository`, `UnitRepository` |
| `ExpenseServiceImpl.java` | `ExpenseRepository`, `BuildingRepository` |
| `UserServiceImpl.java` | `UserRepository` |

**Why:** Spring requires a concrete `@Service` bean for every interface injected into a controller. Without implementations, the application would fail to start with `NoSuchBeanDefinitionException` for each missing service. The repositories and interfaces already existed — only the implementations were missing.

---

### 11. New files: 6 REST Controllers + Updated `BuildingController`

**What was created/updated:**

| Controller | Base Path | Operations |
|-----------|-----------|-----------|
| `FloorController` | `/api/floors` | POST, GET, GET/{id}, DELETE/{id} |
| `UnitController` | `/api/units` | POST, GET, GET/{id}, DELETE/{id} |
| `TenantController` | `/api/tenants` | POST, GET, GET/{id}, DELETE/{id} |
| `RentController` | `/api/rents` | POST, GET, GET/{id}, DELETE/{id} |
| `ExpenseController` | `/api/expenses` | POST, GET, GET/{id}, DELETE/{id} |
| `UserController` | `/api/users` | POST, GET, GET/{id}, DELETE/{id} |
| `BuildingController` | `/api/buildings` | Added GET/{id}, DELETE/{id} |

**Why:** All 7 resource layers (Floor, Unit, Tenant, Rent, Expense, User, Payment) had repositories and service interfaces but zero HTTP endpoints. The application had no way to interact with any of these resources at all. Each controller also uses `@ResponseStatus(HttpStatus.CREATED)` on POST (returns 201) and `@ResponseStatus(HttpStatus.NO_CONTENT)` on DELETE (returns 204) to follow standard REST conventions.

---

### Summary Table

| Category | Files Changed | Files Created |
|----------|--------------|---------------|
| Build config | `pom.xml` | — |
| Security | `SecurityConfig.java` | — |
| Entities | `User.java` | — |
| DTOs | `RentDto.java`, `UserDto.java` | — |
| Service interfaces | `BuildingService.java`, `PaymentService.java`, `FloorService.java`, `UnitService.java`, `TenantService.java`, `RentService.java`, `ExpenseService.java`, `UserService.java` | — |
| Service impls | `BuildingServiceImpl.java`, `PaymentServiceImpl.java` | `FloorServiceImpl.java`, `UnitServiceImpl.java`, `TenantServiceImpl.java`, `RentServiceImpl.java`, `ExpenseServiceImpl.java`, `UserServiceImpl.java` |
| Controllers | `BuildingController.java` | `FloorController.java`, `UnitController.java`, `TenantController.java`, `RentController.java`, `ExpenseController.java`, `UserController.java` |
| Documentation | `CLAUDE.md` | — |