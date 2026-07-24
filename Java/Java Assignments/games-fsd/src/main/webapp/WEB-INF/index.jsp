<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%-- Remember to include your form tag library! --%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Game Library - Login &amp; Registration</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body {
		font-family: 'Space Grotesk', sans-serif;
		background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
		color: #eae8f0; min-height: 100vh; padding: 60px 6vw 80px;
	}
	.tag {
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #ffb454; letter-spacing: 2px; text-transform: uppercase;
	}
	h1 { font-size: 52px; margin: 10px 0 8px; }
	h1 span { color: #ffb454; }
	.subtitle { color: #8f8ba3; margin-bottom: 44px; }
	.panels { display: flex; flex-wrap: wrap; gap: 26px; align-items: flex-start; }
	.panel {
		width: 420px; background: rgba(255,255,255,0.03);
		border: 1px solid #2c2a3e; border-radius: 14px; padding: 28px 26px 32px;
	}
	.panel.amber { box-shadow: 0 0 40px rgba(255,180,84,0.07); }
	.panel.teal  { box-shadow: 0 0 40px rgba(94,234,212,0.07); }
	.panel.teal .tag { color: #5eead4; }
	.panel h2 { font-size: 26px; margin: 6px 0 20px; }
	label {
		display: block; font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase; margin: 16px 0 6px;
	}
	input[type="text"], input[type="password"], input[type="date"] {
		width: 100%; padding: 12px 14px; font-size: 15px;
		font-family: 'Space Grotesk', sans-serif; color: #eae8f0;
		background: #16141f; border: 1px solid #2c2a3e; border-radius: 8px; outline: none;
	}
	input:focus { border-color: #ffb454; }
	.panel.teal input:focus { border-color: #5eead4; }
	.error { display: block; color: #ff6b6b; font-size: 13px; margin-top: 5px; }
	input[type="submit"] {
		width: 100%; margin-top: 24px; padding: 14px; font-size: 15px; font-weight: 700;
		font-family: 'Space Grotesk', sans-serif; color: #0f0e17;
		background: #ffb454; border: none; border-radius: 8px; cursor: pointer;
	}
	.panel.teal input[type="submit"] { background: #5eead4; }
	input[type="submit"]:hover { filter: brightness(1.1); }
</style>
</head>
<body>

	<div class="tag">// game library</div>
	<h1>Play. Rate. <span>Share</span>.</h1>
	<p class="subtitle">Track the games you love with your friends.</p>

	<div class="panels">

		<%-- Registration form bound to the empty "newUser" User instance --%>
		<div class="panel amber">
			<div class="tag">new player</div>
			<h2>Register</h2>
			<form:form action="/register" method="post" modelAttribute="newUser">
				<form:label path="firstName">First Name</form:label>
				<form:input path="firstName" />
				<form:errors path="firstName" cssClass="error" />

				<form:label path="lastName">Last Name</form:label>
				<form:input path="lastName" />
				<form:errors path="lastName" cssClass="error" />

				<form:label path="email">Email</form:label>
				<form:input path="email" />
				<form:errors path="email" cssClass="error" />

				<%-- Date picker: user should be 18 years or older --%>
				<form:label path="dateOfBirth">Date Of Birth</form:label>
				<form:input path="dateOfBirth" type="date" />
				<form:errors path="dateOfBirth" cssClass="error" />

				<form:label path="password">Password</form:label>
				<form:password path="password" />
				<form:errors path="password" cssClass="error" />

				<form:label path="confirm">Confirm Password</form:label>
				<form:password path="confirm" />
				<form:errors path="confirm" cssClass="error" />


				<%-- NINJA BONUS: upload avatar (the picture's URL) --%>
				<form:label path="avatar">Upload Avatar (URL)</form:label>
				<form:input path="avatar" placeholder="https://png.pngtree..." />
				<form:errors path="avatar" cssClass="error" />

				<input type="submit" value="Create Account" />
			</form:form>
		</div>

		<%-- Login form bound to the empty "newLogin" LoginUser instance --%>
		<div class="panel teal">
			<div class="tag">returning player</div>
			<h2>Log in</h2>
			<form:form action="/login" method="post" modelAttribute="newLogin">
				<form:label path="email">Email</form:label>
				<form:input path="email" />
				<form:errors path="email" cssClass="error" />

				<form:label path="password">Password</form:label>
				<form:password path="password" />
				<form:errors path="password" cssClass="error" />

				<input type="submit" value="Sign In" />
			</form:form>
		</div>
	</div>
</body>
</html>
