#SingleInstance Force
SendMode "Input"
SetWorkingDir(A_ScriptDir)

; --- Sleep times (adjust if needed) ---
DefaultSleepTimeAfterMenu := 800
DefaultSleepTimeAfterType := 800
DefaultSleepTimeAfterEnter := 200

; --- Flag to prevent overlapping actions ---
global isFigmaActionRunning := false

; ======================================================================
; --- Only run the following hotkeys when Figma is the active window ---
; ======================================================================
#HotIf WinActive("ahk_exe Figma.exe")

; --- Function to perform the core action (reduces repetition) ---
PerformFigmaQuickAction(commandText) {
    SendInput("^,")
    Sleep(DefaultSleepTimeAfterMenu)
    SendInput(commandText)
    Sleep(DefaultSleepTimeAfterType)
    SendInput("{Enter}")
    Sleep(DefaultSleepTimeAfterEnter)
}

; --- Helper to safely start an action ---
SafeStartAction(keys*) {
    global isFigmaActionRunning
    if (isFigmaActionRunning)
        return false
    isFigmaActionRunning := true
    ; Wait for all modifier keys + main key to be released
    for key in keys {
        KeyWait(key)
    }
    return true
}

; --- Helper to safely end an action ---
SafeEndAction() {
    global isFigmaActionRunning
    isFigmaActionRunning := false
}

; --- Location 1 ---
!F1::{ ; Alt+F1: Save Location 1
    if !SafeStartAction("Alt", "F1")
        return
    PerformFigmaQuickAction("Save Location 1")
    SafeEndAction()
}

F1::{ ; F1: Recall Location 1
    if !SafeStartAction("F1")
        return
    PerformFigmaQuickAction("Recall Location 1")
    SafeEndAction()
}

; --- Location 2 ---
!F2::{ ; Alt+F2: Save Location 2
    if !SafeStartAction("Alt", "F2")
        return
    PerformFigmaQuickAction("Save Location 2")
    SafeEndAction()
}

F2::{ ; F2: Recall Location 2
    if !SafeStartAction("F2")
        return
    PerformFigmaQuickAction("Recall Location 2")
    SafeEndAction()
}

; --- Location 3 ---
!F3::{ ; Alt+F3: Save Location 3
    if !SafeStartAction("Alt", "F3")
        return
    PerformFigmaQuickAction("Save Location 3")
    SafeEndAction()
}

F3::{ ; F3: Recall Location 3
    if !SafeStartAction("F3")
        return
    PerformFigmaQuickAction("Recall Location 3")
    SafeEndAction()
}

; --- Location 4 ---
!F4::{ ; Alt+F4: Save Location 4
    if !SafeStartAction("Alt", "F4")
        return
    PerformFigmaQuickAction("Save Location 4")
    SafeEndAction()
}

F4::{ ; F4: Recall Location 4
    if !SafeStartAction("F4")
        return
    PerformFigmaQuickAction("Recall Location 4")
    SafeEndAction()
}

; --- End of Figma-specific hotkeys ---
#HotIf