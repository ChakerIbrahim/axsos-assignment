<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>The Book Broker</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Space Grotesk', sans-serif;
            background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
            color: #eae8f0;
            min-height: 100vh;
            padding: 60px 6vw 80px;
        }

        .tag {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #ffb454;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* top bar: greeting left, actions right */
        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 44px;
        }

        .hello { color: #8f8ba3; margin-top: 10px; }

        h1 { font-size: 46px; margin-top: 4px; }
        h1 span { color: #ffb454; }

        .actions a {
            display: inline-block;
            padding: 11px 18px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 8px;
            text-decoration: none;
            margin-left: 10px;
        }

        .add { background: #ffb454; color: #0f0e17; }
        .add:hover { filter: brightness(1.1); }

        .shelves { color: #5eead4; border: 1px solid #2c2a3e; }
        .shelves:hover { border-color: #5eead4; }

        .logout { color: #8f8ba3; border: 1px solid #2c2a3e; }
        .logout:hover { color: #eae8f0; border-color: #8f8ba3; }

        /* section heading with mono counter */
        .section-head {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin: 40px 0 14px;
        }

        .section-head h2 { font-size: 22px; }
        .section-head h2 em { font-style: normal; color: #5eead4; }

        .count {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #8f8ba3;
        }

        /* dark table panel */
        table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid #2c2a3e;
            border-radius: 14px;
            overflow: hidden;
        }

        th, td { text-align: left; padding: 14px 18px; font-size: 15px; }

        th {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #5eead4;
            border-bottom: 1px solid #2c2a3e;
        }

        tbody tr { border-bottom: 1px solid #1d1b2b; }
        tbody tr:hover { background: rgba(255, 180, 84, 0.05); }

        /* the book title link */
        td a.title { color: #eae8f0; font-weight: 500; text-decoration: none; }
        td a.title:hover { color: #ffb454; }

        /* action links, mono + color-coded */
        .act {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            text-decoration: none;
            margin-right: 12px;
        }

        .borrow  { color: #ffb454; } /* amber = take a book */
        .return  { color: #5eead4; } /* teal  = give it back */
        .editlnk { color: #5eead4; }
        .act:hover { text-decoration: underline; }

        /* delete as a tiny inline form (needs the hidden _method) */
        form.inline { display: inline; }

        form.inline input[type="submit"] {
            background: none;
            border: none;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #ff6b6b;
            cursor: pointer;
            padding: 0;
        }

        form.inline input[type="submit"]:hover { text-decoration: underline; }

        .empty {
            padding: 22px 18px;
            color: #8f8ba3;
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="topbar">
    <div>
        <div class="tag">// book lender dashboard</div>
        <%-- Hello, Bella. Welcome to.. --%>
        <p class="hello">Hello, <c:out value="${user.userName}" />. Welcome to..</p>
        <h1>The <span>Book Broker</span>!</h1>
    </div>
    <div class="actions">
        <a class="add" href="/books/new">+ Add a book</a>
        <a class="shelves" href="/books">back to the shelves</a>
        <a class="logout" href="/logout">logout</a>
    </div>
</div>

<%-- ================= TOP TABLE =================
     Top table shows all the books that are NOT being borrowed. --%>
<div class="section-head">
    <h2>Available Books to <em>Borrow</em></h2>
    <span class="count">${availableBooks.size()} available</span>
</div>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author Name</th>
        <th>Owner</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="oneBook" items="${availableBooks}">
        <tr>
            <td><c:out value="${oneBook.id}" /></td>
            <td>
                    <%-- Title links to that book's details --%>
                <a class="title" href="/books/${oneBook.id}">
                    <c:out value="${oneBook.title}" />
                </a>
            </td>
            <td><c:out value="${oneBook.author}" /></td>
                <%-- Owner comes through the FIRST relationship: book -> user --%>
            <td><c:out value="${oneBook.user.userName}" /></td>
            <td>
                    <%-- Have edit and delete links if it's the logged
                         user's book; otherwise show the borrow link --%>
                <c:choose>
                    <c:when test="${oneBook.user.id == user.id}">
                        <a class="act editlnk" href="/books/${oneBook.id}/edit">edit</a>
                        <%-- delete deletes the book (it should disappear).
                             Sent as a DELETE via the hidden _method input. --%>
                        <form class="inline" action="/books/${oneBook.id}" method="post">
                            <input type="hidden" name="_method" value="delete" />
                            <input type="submit" value="delete" />
                        </form>
                    </c:when>
                    <c:otherwise>
                        <%-- When borrow is clicked, the book should disappear
                             from the top table and appear in the bottom table --%>
                        <a class="act borrow" href="/bookmarket/${oneBook.id}/borrow">borrow</a>
                    </c:otherwise>
                </c:choose>
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>

<%-- ================= BOTTOM TABLE =================
     Bottom table shows all the books you are currently borrowing. --%>
<div class="section-head">
    <h2>Books I'm <em>Borrowing</em>..</h2>
    <span class="count">${borrowedBooks.size()} borrowed</span>
</div>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author Name</th>
        <th>Owner</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="oneBook" items="${borrowedBooks}">
        <tr>
            <td><c:out value="${oneBook.id}" /></td>
            <td>
                <a class="title" href="/books/${oneBook.id}">
                    <c:out value="${oneBook.title}" />
                </a>
            </td>
            <td><c:out value="${oneBook.author}" /></td>
            <td><c:out value="${oneBook.user.userName}" /></td>
            <td>
                    <%-- When return is clicked, the book should
                         move back to the top table --%>
                <a class="act return" href="/bookmarket/${oneBook.id}/return">return</a>
            </td>
        </tr>
    </c:forEach>
    <c:if test="${borrowedBooks.size() == 0}">
        <tr><td class="empty" colspan="5">You are not borrowing any books yet.</td></tr>
    </c:if>
    </tbody>
</table>
</body>
</html>