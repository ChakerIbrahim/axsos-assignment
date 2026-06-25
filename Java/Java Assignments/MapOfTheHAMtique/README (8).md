# Map of the Hashmatique 🎵

A Java program that uses a `HashMap` to store and retrieve song titles and their lyrics.

---

## 📋 Assignment Overview

A band from Teignmouth, Devon has contracted the company to organize their song list. The goal is to use a `HashMap` with track titles as keys and sample lyrics as values, retrieve a song by its title, and print all tracks with their lyrics.

---

## 📁 Project Structure

```
└── Hash.java   # Main class with HashMap logic
```

---

## 🔧 How It Works

### 1. Create the HashMap
```java
HashMap<String, String> musicLyrics = new HashMap<>();
```
- `String` key   → song title
- `String` value → song lyrics

---

### 2. Add 4 Songs
```java
musicLyrics.put("Not Afraid",      "I am not Afraid");
musicLyrics.put("Real Slim Shade", "I am the real slim shade");
musicLyrics.put("Lovely",          "Is in't lovely?");
musicLyrics.put("Chihiro",         "Huuuuu huu");
```

| Key (Title) | Value (Lyrics) |
|-------------|----------------|
| Not Afraid | I am not Afraid |
| Real Slim Shade | I am the real slim shade |
| Lovely | Is in't lovely? |
| Chihiro | Huuuuu huu |

---

### 3. Pull Out One Song by Title
```java
String lyric = musicLyrics.get("Not Afraid");
System.out.println("Track: Not Afraid | Lyrics: " + lyric);
```
- `map.get("key")` → retrieves the value for that key

---

### 4. Print ALL Tracks and Lyrics
```java
for (Map.Entry<String, String> entry : musicLyrics.entrySet()) {
    System.out.println("Track: " + entry.getKey() + " | Lyrics: " + entry.getValue());
}
```

| Part | What it does |
|------|-------------|
| `musicLyrics.entrySet()` | Converts HashMap into a set of key-value pairs |
| `Map.Entry<String, String> entry` | Holds one key-value pair per iteration |
| `entry.getKey()` | Gets the song title |
| `entry.getValue()` | Gets the lyrics |

---

## 🔁 Why Map.Entry Instead of a Normal Loop?

```java
// ❌ This does NOT work for HashMap:
for (int i = 0; i < musicLyrics.size(); i++) {
    musicLyrics[i]; // HashMaps have NO index!
}

// ✅ This is the correct way:
for (Map.Entry<String, String> entry : musicLyrics.entrySet()) {
    entry.getKey();   // song title
    entry.getValue(); // lyrics
}
```

| Array / ArrayList | HashMap |
|-------------------|---------|
| Has index 0, 1, 2... | Has **no index** |
| Access by position | Access by **key** |
| `list.get(0)` | `map.get("Not Afraid")` |

---

## 🚀 How to Run

### Prerequisites
- Java JDK 17+

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/map-of-the-hashmatique.git
cd map-of-the-hashmatique
```

2. **Compile the file**
```bash
javac Hash.java
```

3. **Run the program**
```bash
java Hash
```

---

## 📤 Expected Output

```
Track: Not Afraid | Lyrics: I am not Afraid
Track: Not Afraid | Lyrics: I am not Afraid
Track: Real Slim Shade | Lyrics: I am the real slim shade
Track: Lovely | Lyrics: Is in't lovely?
Track: Chihiro | Lyrics: Huuuuu huu
```

---

## 💡 Key Concepts Used

| Concept | Usage |
|---------|-------|
| `HashMap<K, V>` | Stores key-value pairs (title → lyrics) |
| `map.put(key, value)` | Adds a song to the HashMap |
| `map.get(key)` | Retrieves lyrics by song title |
| `map.entrySet()` | Returns all key-value pairs for looping |
| `Map.Entry` | Holds one key-value pair during iteration |
| `entry.getKey()` | Gets the song title |
| `entry.getValue()` | Gets the lyrics |

---

## 🔗 Resources

- [Java HashMap Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
- [Java Map.Entry Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Map.Entry.html)
