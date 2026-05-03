# 🐍 Practice pip and virtualenv

## 📋 Assignment Overview

**Course:** Python Stack Onsite — Axsos Academy  
**Module:** Introduction & Setup  
**Assignment:** Practice pip and virtualenv  

This assignment focuses on getting comfortable with `pip` commands and working inside a Python virtual environment. All commands must be run with the virtual environment activated.

---

## 🎯 Objectives

1. Get accustomed to using commands required to use pip modules
2. Practice using a virtual environment

---

## ⚠️ Before You Start

- Open your terminal, command prompt, or Git Bash
- **Always activate your virtual environment first** before running any commands
- You can confirm activation by checking your terminal prompt — it should show `(py3Env)` like this:

```
(py3Env) YourMacBook-Pro:myEnvironments username$
```

---

## 🚀 Commands Practiced

### 1. `pip list`
Displays a table of all the Python packages currently installed in your active environment, along with their version numbers.

### 2. `deactivate`
Deactivates the currently active Python virtual environment. Simply type `deactivate` in your terminal or command prompt.

### 3. `pip list` *(after deactivating)*
Running `pip list` again after deactivating shows the difference — you should see **more** packages listed globally than inside the virtual environment. If the results look the same, go back and check your environment setup.

### 4. Activate Environment
Re-activate your virtual environment:

| OS | Command |
|---|---|
| Mac | `source myEnvironments/py3Env/bin/activate` |
| Windows | `call myEnvironments/py3Env/Scripts/activate` |

### 5. `pip install Django`
Installs the Django package into your active environment. After running this command, observe what information is returned in the terminal.

### 6. `pip freeze`
Outputs a list of all currently installed packages and their **exact versions** in a format used to recreate environments. Difference from `pip list`: `pip freeze` uses a format suitable for `requirements.txt`, while `pip list` is a human-readable table.

### 7. `cd ~/Desktop` → `pip freeze > requirements.txt`
First navigate to your Desktop:
```bash
cd ~/Desktop
```
Then create a snapshot of all installed packages:
```bash
pip freeze > requirements.txt
```
This redirects the output of `pip freeze` into a new file called `requirements.txt`. Open the file to see its contents.

### 8. `pip uninstall Django`
Uninstalls Django from your system or virtual environment.
```bash
pip uninstall django
```

### 9. `pip show Django`
Displays detailed information about the currently installed Django package, including its version number, installation path, and dependencies.

---

## 📝 Key Takeaways

| Command | Purpose |
|---|---|
| `pip list` | Show installed packages (human-readable) |
| `pip freeze` | Show installed packages (machine-readable, for requirements.txt) |
| `pip install <package>` | Install a package |
| `pip uninstall <package>` | Remove a package |
| `pip show <package>` | Show details about a specific package |
| `deactivate` | Exit the virtual environment |
| `source .../activate` | Activate virtual environment (Mac) |
| `call .../activate` | Activate virtual environment (Windows) |

---

## 🛠️ Tech Stack

- **Language:** Python
- **Tools:** pip, virtualenv
- **Version Control:** Git
- **Course Platform:** Axsos Academy
