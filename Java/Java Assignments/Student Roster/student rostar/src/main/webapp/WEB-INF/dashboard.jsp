<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Dorms · Roster</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
	<script src="https://cdn.tailwindcss.com"></script>
	<script>
		tailwind.config = {
			theme: {
				extend: {
					colors: {
						ink:    '#0A1930',
						sage:   '#7A9683',
						sand:   '#F0D48A',
						ember:  '#C41E1E',
						maroon: '#7A1010',
						paper:  '#FBF8F3'
					},
					fontFamily: {
						display: ['Fraunces', 'serif'],
						body: ['Inter', 'sans-serif']
					}
				}
			}
		}
	</script>
	<style>
		.stripe-sage   { background-color: #7A9683; }
		.stripe-sand   { background-color: #F0D48A; }
		.stripe-ember  { background-color: #C41E1E; }
		.stripe-maroon { background-color: #7A1010; }

		/* clipped corner "room tag" notch — the signature motif */
		.tag-notch {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px));
		}
	</style>
</head>
<body class="bg-paper font-body text-ink min-h-screen">

<!-- Hero -->
<header class="relative overflow-hidden bg-ink text-paper">
	<div class="absolute -right-10 -top-16 w-72 h-72 bg-sage/30 rounded-full blur-3xl"></div>
	<div class="absolute right-24 bottom-0 w-40 h-40 bg-ember/20 rounded-full blur-3xl"></div>

	<div class="relative max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-10">
		<p class="uppercase tracking-[0.25em] text-xs text-sand/90 font-semibold mb-3">Housing Roster</p>
		<h1 class="font-display font-semibold text-4xl md:text-5xl leading-tight">
			Every dorm,<br class="hidden md:block"> one clipboard.
		</h1>
		<p class="mt-4 max-w-xl text-paper/70 text-sm md:text-base">
			Track who lives where, add new residents, and keep each wing's roster current — no spreadsheets required.
		</p>

		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/dorms/new" class="inline-flex items-center gap-2 bg-sand text-ink font-semibold text-sm px-5 py-3 rounded-md hover:bg-sand/90 transition">
				+ Add a new dorm
			</a>
			<a href="/student" class="inline-flex items-center gap-2 border border-paper/30 text-paper font-semibold text-sm px-5 py-3 rounded-md hover:bg-paper/10 transition">
				+ Add a new student
			</a>
		</div>
	</div>
</header>

<!-- Dorm cards -->
<main class="max-w-6xl mx-auto px-6 md:px-10 py-12">
	<div class="flex items-baseline justify-between mb-6">
		<h2 class="font-display text-2xl font-semibold text-ink">Dorms</h2>
		<span class="text-xs uppercase tracking-wider text-ink/40 font-semibold">${fn:length(dorms)} total</span>
	</div>

	<c:choose>
		<c:when test="${empty dorms}">
			<div class="border border-dashed border-ink/20 rounded-lg py-16 text-center text-ink/50">
				No dorms yet. <a href="/dorms/new" class="text-ember font-semibold underline">Add your first one</a>.
			</div>
		</c:when>
		<c:otherwise>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<c:forEach var="i" items="${dorms}" varStatus="loop">
					<c:set var="stripes" value="sage,sand,ember,maroon" />
					<c:set var="stripeClass" value="stripe-${fn:split(stripes, ',')[loop.index % 4]}" />

					<div class="tag-notch bg-white rounded-lg shadow-sm border border-ink/5 overflow-hidden flex flex-col">
						<div class="h-2 ${stripeClass}"></div>
						<div class="p-5 flex-1 flex flex-col">
							<h3 class="font-display text-xl font-semibold text-ink mb-1">${i.dormName}</h3>
							<p class="text-xs text-ink/40 font-medium mb-6">Room block #${i.dorm_id}</p>

							<div class="mt-auto flex items-center justify-between pt-4 border-t border-ink/5">
								<a href="/dorms/${i.dorm_id}" class="text-sm font-semibold text-ink hover:text-sage transition">
									See students →
								</a>
								<a href="/dorms/${i.dorm_id}/delete" class="text-xs font-semibold text-ember/80 hover:text-ember uppercase tracking-wide transition">
									Delete
								</a>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</c:otherwise>
	</c:choose>
</main>

<footer class="max-w-6xl mx-auto px-6 md:px-10 py-8 text-xs text-ink/30 font-medium">
	Housing Roster — keep it tidy.
</footer>
</body>
</html>
