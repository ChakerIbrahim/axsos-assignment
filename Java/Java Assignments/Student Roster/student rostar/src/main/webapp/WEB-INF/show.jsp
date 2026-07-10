<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${dorm.dormName} · Roster</title>
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

        select.roster-select {
            border: 1px solid rgba(10,25,48,0.15);
            border-radius: 0.375rem;
            padding: 0.65rem 2.25rem 0.65rem 1rem;
            font-size: 0.875rem;
            background-color: white;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230A1930' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1rem;
        }
        select.roster-select:focus {
            outline: none;
            border-color: #7A9683;
            box-shadow: 0 0 0 2px rgba(122,150,131,0.4);
        }
    </style>
</head>
<body class="bg-paper font-body text-ink min-h-screen">

<!-- Hero -->
<header class="relative overflow-hidden bg-ink text-paper">
    <div class="absolute -right-10 -top-16 w-72 h-72 bg-sage/30 rounded-full blur-3xl"></div>
    <div class="absolute right-24 bottom-0 w-40 h-40 bg-sand/10 rounded-full blur-3xl"></div>

    <div class="relative max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-10">
        <a href="/dorms" class="text-xs font-semibold uppercase tracking-wider text-paper/50 hover:text-paper transition">← Dashboard</a>
        <p class="uppercase tracking-[0.25em] text-xs text-sand/90 font-semibold mt-4 mb-2">Room block</p>
        <h1 class="font-display font-semibold text-4xl md:text-5xl">${dorm.dormName}</h1>
        <p class="mt-2 text-paper/60 text-sm">${fn:length(dorm.student)} student<c:if test="${fn:length(dorm.student) != 1}">s</c:if> assigned</p>
    </div>
</header>

<main class="max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-10">

    <!-- Add student card -->
    <div class="tag-notch bg-white border border-ink/5 shadow-sm rounded-lg overflow-hidden">
        <div class="h-2 bg-sand"></div>
        <div class="p-6 md:p-8">
            <p class="uppercase tracking-[0.2em] text-xs text-maroon font-semibold mb-1">Assign</p>
            <h2 class="font-display text-xl font-semibold text-ink mb-5">Add a student to this dorm</h2>

            <form:form action="/dorms/${dorm.dorm_id}/add" method="post" modelAttribute="students" cssClass="flex flex-col sm:flex-row gap-3">
                <form:select path="student_id" cssClass="roster-select flex-1">
                    <c:forEach var="i" items="${allStudents}">
                        <form:option value="${i.student_id}" label="${i.studentName}" />
                    </c:forEach>
                </form:select>
                <button type="submit" class="bg-ink text-paper font-semibold text-sm px-6 py-3 rounded-md hover:bg-ink/90 transition whitespace-nowrap">
                    Add to dorm
                </button>
            </form:form>
        </div>
    </div>

    <!-- Roster -->
    <div>
        <div class="flex items-baseline justify-between mb-4">
            <h2 class="font-display text-2xl font-semibold text-ink">Students</h2>
        </div>

        <c:choose>
            <c:when test="${empty dorm.student}">
                <div class="border border-dashed border-ink/20 rounded-lg py-16 text-center text-ink/50">
                    No students assigned to this dorm yet.
                </div>
            </c:when>
            <c:otherwise>
                <div class="bg-white border border-ink/5 rounded-lg shadow-sm overflow-hidden">
                    <table class="w-full text-sm">
                        <thead>
                        <tr class="bg-ink/[0.03] text-left">
                            <th class="px-6 py-3 font-semibold text-ink/60 uppercase text-xs tracking-wider">Student</th>
                            <th class="px-6 py-3 font-semibold text-ink/60 uppercase text-xs tracking-wider text-right">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="i" items="${dorm.student}" varStatus="loop">
                            <tr class="${loop.index % 2 == 0 ? '' : 'bg-ink/[0.015]'} border-t border-ink/5">
                                <td class="px-6 py-4 font-medium text-ink">${i.studentName}</td>
                                <td class="px-6 py-4 text-right">
                                    <a href="/student/delete/${i.student_id}/${dorm.dorm_id}" class="text-xs font-semibold text-ember/80 hover:text-ember uppercase tracking-wide transition">
                                        Remove
                                    </a>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</main>

</body>
</html>
