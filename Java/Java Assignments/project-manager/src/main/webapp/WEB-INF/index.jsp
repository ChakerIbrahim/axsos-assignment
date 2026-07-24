<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%-- Remember to include your form tag library! --%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Project Manager</title>
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { font-family: 'Space Grotesk', sans-serif;
			background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
			color: #eae8f0; min-height: 100vh; padding: 60px 6vw 80px; }
		.tag { font-family: 'JetBrains Mono', monospace; font-size: 12px;
			color: #ffb454; letter-spacing: 2px; text-transform: uppercase; }
		h1 { font-size: 52px; margin: 10px 0 8px; }
		h1 span { color: #ffb454; }
		.subtitle { color: #8f8ba3; margin-bottom: 44px; }
		.panels { display: flex; flex-wrap: wrap; gap: 26px; align-items: flex-start; }
		.panel { width: 400px; background: rgba(255,255,255,0.03);
			border: 1px solid #2c2a3e; border-radius: 14px; padding: 28px 26px 32px; }
		.panel.amber { box-shadow: 0 0 40px rgba(255,180,84,0.07); }
		.panel.teal  { box-shadow: 0 0 40px rgba(94,234,212,0.07); }
		.panel.teal .tag { color: #5eead4; }
		.panel h2 { font-size: 26px; margin: 6px 0 20px; }
		label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 12px;
			color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase; margin: 16px 0 6px; }
		input[type="text"], input[type="password"], input[type="date"], input[type="file"] { width: 100%; padding: 12px 14px;
			font-size: 15px; font-family: 'Space Grotesk', sans-serif; color: #eae8f0;
			background: #16141f; border: 1px solid #2c2a3e; border-radius: 8px; outline: none; }
		input:focus { border-color: #ffb454; }
		.panel.teal input:focus { border-color: #5eead4; }
		input[type="file"] { color: #8f8ba3; }
		input[type="file"]::file-selector-button {
			background: #2c2a3e; color: #eae8f0; border: none; border-radius: 6px;
			padding: 7px 12px; margin-right: 10px; cursor: pointer;
			font-family: 'Space Grotesk', sans-serif; }
		.error { display: block; color: #ff6b6b; font-size: 13px; margin-top: 5px; }
		input[type="submit"] { width: 100%; margin-top: 24px; padding: 14px; font-size: 15px;
			font-weight: 700; font-family: 'Space Grotesk', sans-serif; color: #0f0e17;
			background: #ffb454; border: none; border-radius: 8px; cursor: pointer; }
		.panel.teal input[type="submit"] { background: #5eead4; }
		input[type="submit"]:hover { filter: brightness(1.1); }
	</style>
</head>
<body>

<div class="tag">// project manager</div>
<h1>Plan. Team up. <span>Ship</span>.</h1>
<p class="subtitle">A place for teams to manage projects.</p>

<div class="panels">

	<%-- Registration form bound to the empty "newUser" User instance --%>
	<div class="panel amber">
		<div class="tag">new member</div>
		<h2>Register</h2>
		<%-- enctype="multipart/form-data" is REQUIRED for file uploads:
             without it the browser sends only the filename, not the file --%>
		<form:form action="/register" method="post" modelAttribute="newUser"
		           enctype="multipart/form-data">
			<form:label path="firstName">First Name</form:label>
			<form:input path="firstName" />
			<form:errors path="firstName" cssClass="error" />

			<form:label path="lastName">Last Name</form:label>
			<form:input path="lastName" />
			<form:errors path="lastName" cssClass="error" />

			<form:label path="email">Email</form:label>
			<form:input path="email" />
			<form:errors path="email" cssClass="error" />

			<form:label path="password">Password</form:label>
			<form:password path="password" />
			<form:errors path="password" cssClass="error" />

			<form:label path="confirm">Confirm PW</form:label>
			<form:password path="confirm" />
			<form:errors path="confirm" cssClass="error" />

			<%-- NINJA BONUS: date picker - must be 18 years or older --%>
			<form:label path="dateOfBirth">Date Of Birth</form:label>
			<form:input path="dateOfBirth" type="date" />
			<form:errors path="dateOfBirth" cssClass="error" />

			<%-- NINJA BONUS: upload avatar from the PC.
                 A plain file input (not form:input): the file is not
                 data-bound to the model - the controller receives it
                 with @RequestParam("avatarFile") MultipartFile.
                 accept="image/*" makes the picker show images only. --%>
			<label>Upload Avatar</label>
			<input type="file" name="avatarFile" accept="image/*" />
			<form:errors path="avatar" cssClass="error" />

			<input type="submit" value="Submit" />
		</form:form>
	</div>

	<%-- Login form bound to the empty "newLogin" LoginUser instance --%>
	<div class="panel teal">
		<div class="tag">returning member</div>
		<h2>Log in</h2>
		<form:form action="/login" method="post" modelAttribute="newLogin">
			<form:label path="email">Email</form:label>
			<form:input path="email" />
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