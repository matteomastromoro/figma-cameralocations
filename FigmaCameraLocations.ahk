#NoEnv
SendMode Input
SetWorkingDir %A_ScriptDir%

; --- Sleep times (adjust if needed) ---
DefaultSleepTimeAfterMenu := 300
DefaultSleepTimeAfterType := 300
DefaultSleepTimeAfterEnter := 200

; --- Flag to prevent overlapping actions ---
global isFigmaActionRunning := 0 ; Global so all hotkeys share it. 0 = false, 1 = true

; --- Only run the following hotkeys when Figma is the active window ---
#IfWinActive ahk_exe Figma.exe

; --- Function to perform the core action (reduces repetition) ---
PerformFigmaQuickAction(commandText) {
    global isFigmaActionRunning
    global DefaultSleepTimeAfterMenu, DefaultSleepTimeAfterType, DefaultSleepTimeAfterEnter

    SendInput ^,
    Sleep, %DefaultSleepTimeAfterMenu%
    SendInput %commandText%
    Sleep, %DefaultSleepTimeAfterType%
    SendInput {Enter}
    Sleep, %DefaultSleepTimeAfterEnter%
}

; --- Helper to safely start an action ---
SafeStartAction(keys*) {
    global isFigmaActionRunning
    if (isFigmaActionRunning)
        return false
    isFigmaActionRunning := 1
    ; Wait for all modifier keys + main key to be released
    for index, key in keys {
        KeyWait, %key%
    }
    return true
}

; --- Helper to safely end an action ---
SafeEndAction() {
    global isFigmaActionRunning
    isFigmaActionRunning := 0
}

; --- Position 1 ---
!F1:: ; Alt+F1: Save Position 1
    if (!SafeStartAction("Alt", "F1"))
        return
    PerformFigmaQuickAction("Save Position 1")
    SafeEndAction()
return

F1:: ; F1: Recall Position 1
    if (!SafeStartAction("F1"))
        return
    PerformFigmaQuickAction("Recall Position 1")
    SafeEndAction()
return

; --- Position 2 ---
!F2:: ; Alt+F2: Save Position 2
    if (!SafeStartAction("Alt", "F2"))
        return
    PerformFigmaQuickAction("Save Position 2")
    SafeEndAction()
return

F2:: ; F2: Recall Position 2
    if (!SafeStartAction("F2"))
        return
    PerformFigmaQuickAction("Recall Position 2")
    SafeEndAction()
return

; --- Position 3 ---
!F3:: ; Alt+F3: Save Position 3
    if (!SafeStartAction("Alt", "F3"))
        return
    PerformFigmaQuickAction("Save Position 3")
    SafeEndAction()
return

F3:: ; F3: Recall Position 3
    if (!SafeStartAction("F3"))
        return
    PerformFigmaQuickAction("Recall Position 3")
    SafeEndAction()
return

; --- Position 4 ---
!F4:: ; Alt+F4: Save Position 4
    if (!SafeStartAction("Alt", "F4"))
        return
    PerformFigmaQuickAction("Save Position 4")
    SafeEndAction()
return

F4:: ; F4: Recall Position 4
    if (!SafeStartAction("F4"))
        return
    PerformFigmaQuickAction("Recall Position 4")
    SafeEndAction()
return

; --- End of Figma-specific hotkeys ---
#IfWinActive
