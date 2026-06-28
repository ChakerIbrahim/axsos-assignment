# CareSoft Interfaces Assignment

## Overview

This project is part of a healthcare clinic management system called **CareSoft**. The goal is to implement two HIPAA compliance interfaces (`HIPAACompliantUser` and `HIPAACompliantAdmin`) in two existing classes (`Physician` and `AdminUser`), ensuring secure access control and incident reporting for electronic Personal Health Information (ePHI).

---

## Project Structure

```
com.caresoft.clinicapp/
├── User.java                  # Base class with shared fields (id, pin)
├── HIPAACompliantUser.java    # Interface: assignPin, accessAuthorized
├── HIPAACompliantAdmin.java   # Interface: reportSecurityIncidents
├── Physician.java             # Implements HIPAACompliantUser
├── AdminUser.java             # Implements HIPAACompliantUser + HIPAACompliantAdmin
└── Test.java                  # Main test class
```

---

## Interfaces

### HIPAACompliantUser
```java
boolean assignPin(int pin);
boolean accessAuthorized(Integer confirmedAuthID);
```

### HIPAACompliantAdmin
```java
ArrayList<String> reportSecurityIncidents();
```
Also provides default methods: `printSecurityIncidents()` and `adminQATest()`.

---

## Step-by-Step Implementation

### Step 1 — Understand the existing code

Before writing any code, read all existing files:
- `User.java` gives you the base fields: `id` and `pin`
- `HIPAACompliantUser.java` tells you what methods to implement
- `HIPAACompliantAdmin.java` tells you what the admin needs
- `Test.java` shows exactly how the classes will be used and what output is expected

---

### Step 2 — Implement Physician

**Physician** extends `User` and implements `HIPAACompliantUser`.

#### Constructor
```java
public Physician(Integer id) {
    this.id = id;
    this.patientNotes = new ArrayList<String>();
}
```
- Sets the physician's ID (inherited from `User`)
- Initializes the patientNotes list

#### assignPin(int pin)
```java
public boolean assignPin(int pin) {
    if (pin >= 1000 && pin <= 9999) {
        this.pin = pin;
        return true;
    }
    return false;
}
```
- A valid physician PIN is **exactly 4 digits** (1000–9999)
- If valid: assign to `this.pin` and return `true`
- If invalid: return `false`

#### accessAuthorized(Integer confirmedAuthID)
```java
public boolean accessAuthorized(Integer confirmedAuthID) {
    return this.id.equals(confirmedAuthID);
}
```
- Compares the physician's own `id` with the provided ID
- Returns `true` if they match, `false` otherwise

---

### Step 3 — Implement AdminUser

**AdminUser** extends `User` and implements both `HIPAACompliantUser` and `HIPAACompliantAdmin`.

#### Constructor
```java
public AdminUser(Integer id, String role) {
    this.id = id;
    this.role = role;
    this.securityIncidents = new ArrayList<String>();
}
```
- Sets the admin's ID and role
- Initializes the securityIncidents list (important — without this, `authIncident()` will crash)

#### assignPin(int pin)
```java
public boolean assignPin(int pin) {
    String pinStr = String.valueOf(pin);
    if (pinStr.length() >= 6) {
        this.pin = pin;
        return true;
    }
    return false;
}
```
- Admin PIN must be **6 digits or longer**
- Convert to String to easily check length
- If valid: assign and return `true`; otherwise return `false`

#### accessAuthorized(Integer confirmedAuthID)
```java
public boolean accessAuthorized(Integer confirmedAuthID) {
    if (!this.id.equals(confirmedAuthID)) {
        authIncident();  // log the failed attempt
        return false;
    }
    return true;
}
```
- If IDs don't match: call `authIncident()` to log the failed attempt, return `false`
- If IDs match: return `true`

#### reportSecurityIncidents()
```java
public ArrayList<String> reportSecurityIncidents() {
    return this.securityIncidents;
}
```
- Simply returns the list of security incidents that were logged by `authIncident()`

---

## Key Concepts Used

| Concept | Where Used |
|---|---|
| **Interfaces** | `HIPAACompliantUser`, `HIPAACompliantAdmin` |
| **implements keyword** | `Physician implements HIPAACompliantUser` |
| **Multiple interfaces** | `AdminUser implements HIPAACompliantUser, HIPAACompliantAdmin` |
| **Inheritance** | Both classes extend `User` |
| **@Override annotation** | All interface method implementations |
| **ArrayList** | `securityIncidents`, `patientNotes` |
| **Default interface methods** | `printSecurityIncidents()`, `adminQATest()` in `HIPAACompliantAdmin` |

---

## Expected Test Output

```
========== Physician Tests ==========

Physician pin assign test 1: PASS   (pin 42 is not 4 digits → false → FAIL becomes PASS)
Physician pin assign test 2: PASS   (pin 4000 is 4 digits → true → PASS)
Physician auth test 1: PASS         (id 1234 != doctor's id 1 → false → FAIL becomes PASS)
Physician auth test 2: PASS         (id 1 == doctor's id 1 → true → PASS)

========== AdminUser Tests ==========

Admin pin assign test 1: PASS       (pin 42 is not 6 digits → false → FAIL becomes PASS)
Admin pin assign test 2: PASS       (pin 424242 is 6 digits → true → PASS)
Admin auth test 1: PASS             (id 1234 != roseTyler's id 2 → false → FAIL becomes PASS)
Admin auth test 2: PASS             (id 2 == roseTyler's id 2 → true → PASS)

[security incidents from donnaNoble's 4 failed access attempts]
```

---

## How to Run

1. Import the project into Eclipse: `File → Import → Existing Projects into Workspace`
2. Navigate to the `caresoft` folder and click Finish
3. Open `Test.java`
4. Right-click → `Run As → Java Application`

---

## Author
Chaker  
AXSOS Academy — Java Stack
