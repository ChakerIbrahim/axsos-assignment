<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login and Registration</title>
    <%-- Serif display font for the big headings --%>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #faf5ec; /* cream background */
            color: #0e1c2f;      /* navy text */
            min-height: 100vh;
        }

        /* ---- dark hero band ---- */
        .hero {
            background: linear-gradient(100deg, #0e1c2f 60%, #16283f 100%);
            color: #fff;
            padding: 64px 8vw 72px;
        }

        /* small uppercase letter-spaced label */
        .eyebrow {
            color: #f2d383; /* gold */
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 14px;
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: 52px;
            line-height: 1.1;
            margin-bottom: 16px;
        }

        .hero p {
            color: #c7cdd6;
            max-width: 430px;
            line-height: 1.6;
        }

        /* ---- the two form cards ---- */
        .cards {
            display: flex;
            flex-wrap: wrap;
            gap: 28px;
            padding: 48px 8vw 80px;
            align-items: flex-start;
        }

        .card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(14, 28, 47, 0.08);
            padding: 30px 28px 34px;
            width: 400px;
            border-top: 6px solid #f2d383; /* gold top bar */
        }

        /* the login card gets the green top bar instead */
        .card.green {
            border-top-color: #7d9471;
        }

        .card .eyebrow {
            color: #b3432b; /* rust red label inside cards */
            margin-bottom: 8px;
        }

        .card h2 {
            font-family: 'Playfair Display', serif;
            font-size: 30px;
            margin-bottom: 22px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 600;
            margin: 16px 0 6px;
        }

        input[type="text"],
        input[type="password"],
        input[type="date"],
        select {
            width: 100%;
            padding: 12px 14px;
            font-size: 15px;
            font-family: 'Inter', sans-serif;
            border: 1px solid #dcd6c9;
            border-radius: 8px;
            background: #fff;
            outline: none;
        }

        input:focus,
        select:focus {
            border-color: #0e1c2f;
        }

        /* rows of radio buttons / checkboxes */
        .choices {
            display: flex;
            flex-wrap: wrap;
            gap: 6px 16px;
            font-size: 14px;
        }

        /* labels inside the choice rows shouldn't be bold block labels */
        .choices label {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-weight: 400;
            margin: 0;
        }

        /* validation error messages */
        .error {
            display: block;
            color: #b3432b;
            font-size: 13px;
            margin-top: 5px;
        }

        /* navy primary button */
        input[type="submit"] {
            width: 100%;
            margin-top: 24px;
            padding: 14px;
            font-size: 15px;
            font-weight: 700;
            font-family: 'Inter', sans-serif;
            color: #fff;
            background: #0e1c2f;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background: #1c2f4a;
        }
    </style>
</head>
<body>

<%-- dark hero band with the welcome message --%>
<div class="hero">
    <div class="eyebrow">Login &amp; Registration</div>
    <h1>Welcome!</h1>
    <p>Join our growing community.</p>
</div>

<div class="cards">

    <%-- ============ Registration card (gold top bar) ============ --%>
    <div class="card">
        <div class="eyebrow">New member</div>
        <h2>Register</h2>

        <form:form action="/register" method="post" modelAttribute="newUser">
            <form:label path="userName">Username</form:label>
            <form:input path="userName" placeholder="e.g. JaneSmith" />
            <form:errors path="userName" cssClass="error" />

            <form:label path="email">Email</form:label>
            <form:input path="email" placeholder="e.g. jane@email.com" />
            <form:errors path="email" cssClass="error" />

            <form:label path="password">Password</form:label>
            <form:password path="password" />
            <form:errors path="password" cssClass="error" />

            <form:label path="confirm">Confirm PW</form:label>
            <form:password path="confirm" />
            <form:errors path="confirm" cssClass="error" />

            <%-- NINJA BONUS: date picker for the birthday --%>
            <form:label path="birthday">Birthday</form:label>
            <form:input path="birthday" type="date" />
            <form:errors path="birthday" cssClass="error" />

            <%-- NINJA BONUS: drop-down menu --%>
            <form:label path="occupation">Occupation</form:label>
            <form:select path="occupation">
                <form:option value="" label="-- select --" />
                <form:option value="Student">Student</form:option>
                <form:option value="Developer">Developer</form:option>
                <form:option value="Other">Other</form:option>
            </form:select>
            <form:errors path="occupation" cssClass="error" />

            <%-- NINJA BONUS: radio buttons --%>
            <form:label path="experience">Experience level</form:label>
            <div class="choices">
                <label><form:radiobutton path="experience" value="Beginner" /> Beginner</label>
                <label><form:radiobutton path="experience" value="Intermediate" /> Intermediate</label>
                <label><form:radiobutton path="experience" value="Advanced" /> Advanced</label>
            </div>
            <form:errors path="experience" cssClass="error" />

            <%-- NINJA BONUS: checkboxes - at least one language required --%>
            <form:label path="languages">Languages of interest</form:label>
            <div class="choices">
                <label><form:checkbox path="languages" value="Java" /> Java</label>
                <label><form:checkbox path="languages" value="Python" /> Python</label>
                <label><form:checkbox path="languages" value="JavaScript" /> JavaScript</label>
                <label><form:checkbox path="languages" value="C#" /> C#</label>
            </div>
            <form:errors path="languages" cssClass="error" />

            <input type="submit" value="Submit" />
        </form:form>
    </div>

    <%-- ============ Login card (green top bar) ============ --%>
    <div class="card green">
        <div class="eyebrow">Returning member</div>
        <h2>Log in</h2>

        <form:form action="/login" method="post" modelAttribute="newLogin">
            <form:label path="email">Email</form:label>
            <form:input path="email" placeholder="e.g. jane@email.com" />
            <form:errors path="email" cssClass="error" />

            <form:label path="password">Password</form:label>
            <form:password path="password" />
            <form:errors path="password" cssClass="error" />

            <input type="submit" value="Submit" />
        </form:form>
    </div>
</div>
</body>
</html>