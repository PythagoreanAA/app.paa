const actionPrompts = [
}

startSessionBtn.addEventListener("click", beginSession);

completeActionBtn.addEventListener("click", () => {
  advanceToReflection();
  reflectionInput.focus();
});

newPromptBtn.addEventListener("click", () => {
  setPrompt(actionPromptEl, actionPrompts);
  setActiveStep(5);
});

newReflectionBtn.addEventListener("click", () => {
  setPrompt(reflectionPromptEl, reflectionPrompts);
  setActiveStep(7);
});

newThresholdBtn.addEventListener("click", () => {
  setPrompt(thresholdPromptEl, thresholdPrompts);
  setActiveStep(11);
});

journalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = actionInput.value.trim();
  const reflection = reflectionInput.value.trim();
  const threshold = thresholdInput.value.trim();

  if (!action || !reflection || !threshold) {
    alert("Complete all three fields before saving the entry.");
    return;
  }

  const entries = loadEntries();
  entries.push({
    action,
    reflection,
    threshold,
    createdAt: new Date().toISOString()
  });

  saveEntries(entries);
  renderEntries();

  actionInput.value = "";
  reflectionInput.value = "";
  thresholdInput.value = "";

  sessionStatusEl.textContent = "Session Completed";
  advanceToThreshold();
});

clearJournalBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderEntries();
  sessionStatusEl.textContent = "Inactive";
  setActiveStep(5);
});

reflectionInput.addEventListener("focus", () => setActiveStep(7));
thresholdInput.addEventListener("focus", () => setActiveStep(11));
actionInput.addEventListener("focus", () => setActiveStep(5));

beginSession();
renderEntries();