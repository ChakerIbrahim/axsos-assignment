# Simple Receipt

A Spring Boot + JSP application that demonstrates how to pass data from a controller to a view using Spring's `Model` object. The app renders a simple purchase receipt with customer name, item name, price, description, and vendor.

## Assignment Overview

In this assignment, data is defined in the controller (`MainController`) and added to the Spring `Model`. The JSP view (`index.jsp`) then pulls those values out using JSTL's `<c:out>` tag and displays them as a rendered receipt in the browser.

## Tech Stack

- Java 17
- Spring Boot 4.1.0 (Spring Boot Starter Web, Tomcat, Jasper)
- JSP / JSTL
- Maven (WAR packaging)

## Project Structure

```
Receipt/
├── src/
│   └── main/
│       ├── java/com/axsos/receipt/
│       │   ├── ReceiptApplication.java       # Spring Boot entry point
│       │   └── controllers/
│       │       └── MainController.java       # Builds receipt data and adds it to the model
│       ├── resources/
│       │   └── application.properties        # Configures JSP view prefix
│       └── webapp/
│           └── WEB-INF/
│               └── views/
│                   └── index.jsp              # Renders the receipt
└── pom.xml
```

## How It Works

1. When a user visits `/`, `MainController#index` runs and creates five local variables: `name`, `itemName`, `price`, `description`, and `vendor`.
2. Each value is added to the `Model` object via `model.addAttribute(key, value)`. This makes the data available to the view by name.
3. The controller returns the string `"index.jsp"`, which Spring resolves to `/WEB-INF/views/index.jsp` using the `spring.mvc.view.prefix` property.
4. Inside `index.jsp`, the JSTL `<c:out>` tag pulls each value out of the model (e.g. `${name}`) and writes it safely into the HTML.

## Getting Started

### Prerequisites

- Java 17 or later
- Maven 3.6+

### Running the App

1. Clone or download the project.
2. From the project root, run:
   ```bash
   mvn spring-boot:run
   ```
3. Open your browser and go to:
   ```
   http://localhost:8080/
   ```
4. You should see the rendered receipt with Grace Hopper's purchase details.

### Building a WAR

```bash
mvn clean package
```

The resulting WAR file will be in the `target/` directory and can be deployed to any Servlet container.

## Configuration Notes

- `spring.mvc.view.prefix=/WEB-INF/views/` tells Spring where to find JSP files. No `suffix` property is set because the controller already returns the full filename (`"index.jsp"`) including the extension.
- The `WEB-INF/views` folder must live under `src/main/webapp` so that Tomcat can locate and serve the JSP at runtime.
- JSTL support requires both:
  - The `jakarta.servlet.jsp.jstl-api` and `jakarta.servlet.jsp.jstl` (GlassFish) dependencies in `pom.xml`.
  - The taglib declaration at the top of `index.jsp`:
    ```jsp
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    ```

## Testing / Customization

To verify the controller-to-view data flow works correctly, try changing the values in `MainController` (e.g. swap "Grace Hopper" for another name, change the item, price, or vendor) and confirm the page updates accordingly after a restart and refresh.

## Possible Improvements

- Replace hardcoded values with data from a form submission or a database/service layer.
- Add input validation and currency formatting (e.g. using `<fmt:formatNumber>`).
- Support multiple line items instead of a single item per receipt.

## Author

Assignment project for learning Spring MVC's Model-to-View data binding with JSP and JSTL.
