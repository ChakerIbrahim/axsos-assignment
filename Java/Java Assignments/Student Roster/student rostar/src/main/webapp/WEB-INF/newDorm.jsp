<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Dorm · Roster</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        ink: '#0A1930', sage: '#7A9683', sand: '#F0D48A',
                        ember: '#C41E1E', maroon: '#7A1010', paper: '#FBF8F3'
                    },
                    fontFamily: { display: ['Fraunces', 'serif'], body: ['Inter', 'sans-serif'] }
                }
            }
        }
    </script>
    <style>
        .tag-notch { clip-path: polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px)); }
        .field-error { color: #C41E1E; font-size: 0.75rem; font-weight: 600; margin-top: 0.25rem; display: block; }
    </style>
</head>
<body class="bg-paper font-body text-ink min-h-screen flex items-center justify-center px-6">

<div class="w-full max-w-md">
    <a href="/dorms" class="text-xs font-semibold uppercase tracking-wider text-ink/40 hover:text-ink transition">← Dashboard</a>

    <div class="tag-notch bg-white border border-ink/5 shadow-sm rounded-lg mt-6 overflow-hidden">
        <div class="h-2 bg-sage"></div>
        <div class="p-8">
            <p class="uppercase tracking-[0.25em] text-xs text-sage font-semibold mb-2">New room block</p>
            <h1 class="font-display text-3xl font-semibold text-ink mb-8">Add a dorm</h1>

            <form:form action="/dorms/create" method="post" modelAttribute="dorms" cssClass="space-y-6">

                <div>
                    <form:label path="dormName" cssClass="block text-sm font-semibold text-ink mb-2">Dorm name</form:label>
                    <form:input path="dormName" cssClass="w-full border border-ink/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition" placeholder="e.g. West Wing" />
                    <form:errors path="dormName" cssClass="field-error" />
                </div>

                <button type="submit" class="w-full bg-ink text-paper font-semibold text-sm px-5 py-3 rounded-md hover:bg-ink/90 transition">
                    Add dorm
                </button>
            </form:form>
        </div>
    </div>
</div>

</body>
</html>
