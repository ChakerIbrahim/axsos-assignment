<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit Game</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body {
		font-family: 'Space Grotesk', sans-serif;
		background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
		color: #eae8f0; min-height: 100vh;
		display: flex; justify-content: center; padding-top: 70px;
	}
	.wrap { width: 460px; }
	.topline {
		display: flex; justify-content: space-between; align-items: center;
		margin-bottom: 16px;
	}
	.back, .logout {
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase;
		text-decoration: none;
	}
	.back:hover, .logout:hover { color: #5eead4; }
	.panel {
		background: rgba(255,255,255,0.03); border: 1px solid #2c2a3e;
		border-radius: 14px; padding: 28px 26px 32px;
		box-shadow: 0 0 40px rgba(94,234,212,0.07);
	}
	.tag {
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #5eead4; letter-spacing: 2px; text-transform: uppercase;
	}
	h1 { font-size: 26px; margin: 6px 0 18px; }
	label {
		display: block; font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase; margin: 15px 0 6px;
	}
	input[type="text"], input[type="date"], textarea, select {
		width: 100%; padding: 12px 14px; font-size: 15px;
		font-family: 'Space Grotesk', sans-serif; color: #eae8f0;
		background: #16141f; border: 1px solid #2c2a3e; border-radius: 8px; outline: none;
	}
	textarea { min-height: 110px; resize: vertical; }
	input:focus, textarea:focus, select:focus { border-color: #5eead4; }
	.error { display: block; color: #ff6b6b; font-size: 13px; margin-top: 5px; }
	.buttons { display: flex; gap: 12px; margin-top: 22px; }
	.btn {
		flex: 1; padding: 13px; font-size: 15px; font-weight: 700; text-align: center;
		font-family: 'Space Grotesk', sans-serif; border-radius: 8px;
		border: none; cursor: pointer; text-decoration: none;
	}
	.apply { background: #5eead4; color: #0f0e17; }
	.apply:hover { filter: brightness(1.1); }
	.cancel { background: none; border: 1px solid #2c2a3e; color: #8f8ba3; }
	.cancel:hover { border-color: #8f8ba3; color: #eae8f0; }
</style>
</head>
<body>
	<div class="wrap">
		<div class="topline">
			<a class="back" href="/dashboard">&larr; dashboard</a>
			<a class="logout" href="/logout">logout</a>
		</div>

		<div class="panel">
			<div class="tag">// edit game</div>
			<h1>Edit <c:out value="${game.title}" /></h1>

			<%-- The form is bound to the EXISTING "game" object the
			     controller fetched, so data binding PRE-POPULATES every
			     input with the existing values for the game.
			     method="put": the Spring form tag adds the hidden
			     "_method" input for us -> reaches our @PutMapping.
			     Validations: same as for create. --%>
			<form:form action="/games/${game.id}" method="put" modelAttribute="game">
				<form:label path="title">Game name</form:label>
				<form:input path="title" />
				<form:errors path="title" cssClass="error" />

				<%-- The dropdown pre-selects the game's current genre --%>
				<form:label path="genre">Genre</form:label>
				<form:select path="genre">
					<form:option value="Action">Action</form:option>
					<form:option value="Strategy">Strategy</form:option>
					<form:option value="RPG">RPG</form:option>
					<form:option value="Arcade">Arcade</form:option>
					<form:option value="Adventure">Adventure</form:option>
					<form:option value="Tactical shooter">Tactical shooter</form:option>
				</form:select>
				<form:errors path="genre" cssClass="error" />

				<form:label path="releaseDate">Release Date</form:label>
				<form:input path="releaseDate" type="date" />
				<form:errors path="releaseDate" cssClass="error" />

				<form:label path="description">Description</form:label>
				<form:textarea path="description" />
				<form:errors path="description" cssClass="error" />

				<div class="buttons">
					<input class="btn apply" type="submit" value="Apply" />
					<%-- Cancel just navigates back without submitting --%>
					<a class="btn cancel" href="/game/${game.id}">Cancel</a>
				</div>
			</form:form>
		</div>
	</div>
</body>
</html>
