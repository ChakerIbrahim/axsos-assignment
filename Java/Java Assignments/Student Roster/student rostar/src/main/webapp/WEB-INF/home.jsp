<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Dashboard</title>
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		body {
			font-family: 'Inter', sans-serif;
			background: #faf5ec; /* cream */
			color: #0e1c2f;      /* navy */
			min-height: 100vh;
			display: flex;
			flex-direction: column;
		}

		/* ================= dark hero band ================= */
		.hero {
			background: #0e1c2f;
			/* subtle glow on the right, like the reference */
			background: linear-gradient(100deg, #0e1c2f 60%, #16283f 100%);
			color: #fff;
			padding: 64px 8vw 72px;
		}

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
			font-size: 56px;
			line-height: 1.12;
			margin-bottom: 16px;
		}

		.hero p {
			color: #c7cdd6;
			max-width: 440px;
			line-height: 1.6;
			margin-bottom: 28px;
		}

		/* ---- hero buttons (one gold, one outlined) ---- */
		.btn {
			display: inline-block;
			padding: 12px 20px;
			font-size: 14px;
			font-weight: 700;
			font-family: 'Inter', sans-serif;
			border-radius: 8px;
			text-decoration: none;
			cursor: pointer;
		}

		.btn.gold {
			background: #f2d383;
			color: #0e1c2f;
			border: 1px solid #f2d383;
			margin-right: 10px;
		}

		.btn.gold:hover {
			background: #eec966;
		}

		.btn.outline {
			background: transparent;
			color: #fff;
			border: 1px solid #4a5a70;
		}

		.btn.outline:hover {
			border-color: #fff;
		}

		/* ================= content section ================= */
		.content {
			padding: 44px 8vw 40px;
			flex: 1;
		}

		.section-head {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-bottom: 22px;
		}

		.section-head h2 {
			font-family: 'Playfair Display', serif;
			font-size: 28px;
		}

		/* the small grey counter on the right, like "2 TOTAL" */
		.count {
			color: #9aa1ab;
			font-size: 12px;
			font-weight: 700;
			letter-spacing: 2px;
			text-transform: uppercase;
		}

		/* dashed empty-state box, like "No students assigned yet" */
		.empty {
			border: 2px dashed #d9d2c3;
			border-radius: 10px;
			padding: 56px 20px;
			text-align: center;
			color: #9aa1ab;
			font-size: 15px;
		}

		/* ================= footer line ================= */
		.footer {
			padding: 0 8vw 36px;
			color: #b6ac99;
			font-size: 13px;
		}
	</style>
</head>
<body>

<%-- ======== dark hero: greeting + actions ======== --%>
<div class="hero">
	<div class="eyebrow">Dashboard</div>

	<%-- Greet the logged-in user by name (from session -> controller) --%>
	<h1>Welcome,<br><c:out value="${user.userName}" />!</h1>

	<p>This is your dashboard. You are securely logged in — your session
		keeps you here until you log out.</p>

	<%-- gold primary action + outlined logout, like the reference buttons --%>
	<a class="btn gold" href="/dorms">Go to Dorms Table</a>
	<a class="btn outline" href="/logout">Log out</a>
</div>

<%-- ======== light content section ======== --%>
<div class="content">
	<div class="section-head">
		<h2>Your activity</h2>
		<span class="count">0 total</span>
	</div>

	<%-- dashed empty-state box --%>
	<div class="empty">
		Nothing to see here yet.
	</div>
</div>

<div class="footer">
	Dashboard &mdash; keep it tidy.
</div>

</body>
</html>