document.addEventListener("DOMContentLoaded", (event) => {

    const slider = document.querySelector('.slider');
    let password = document.getElementById('generated-password');
    let characterLength = document.getElementById("character-length");
    const inputUpperCase = document.getElementById('input-upper-case');
    const inputLowerCase = document.getElementById('input-lower-case');
    const inputNumbers = document.getElementById('input-numbers');
    const inputSymbols = document.getElementById('input-symbols');
    const strengthLevel = document.getElementById('strenght-level');
    const generateButton = document.getElementById('generate-button');
    const tooWeakBtn = document.getElementById('tooWeak');
    const weakBtn = document.getElementById('weak');
    const mediumBtn = document.getElementById('medium');
    const strongBtn = document.getElementById('strong');
    const copyImage = document.getElementById("img-copy");
    const copyText = document.getElementById("copied-text");



    const updateSliderBackground = () => {
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${value}%, #18171F ${value}%, #18171F 100%)`;
    };
    updateSliderBackground();
    characterLength.textContent = slider.value;

    slider.addEventListener('input', function () {
        updateSliderBackground();
        characterLength.textContent = this.value;
    });

    function generateRandomString(length, useUpperCase, useLowerCase, useNumbers, useSymbols) {
        let characters = '';
        if (useUpperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) characters += '0123456789';
        if (useSymbols) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (characters.length === 0) {
            return '';
        }

        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const generatePassword = () => {
        const length = parseInt(slider.value);
        const useUpperCase = inputUpperCase.checked;
        const useLowerCase = inputLowerCase.checked;
        const useNumbers = inputNumbers.checked;
        const useSymbols = inputSymbols.checked;

        const newPassword = generateRandomString(length, useUpperCase, useLowerCase, useNumbers, useSymbols);
        password.textContent = newPassword;
        copyText.style.display = "none";

        if (length < 5 || (!useUpperCase && !useSymbols && !useNumbers)) {
            strengthLevel.textContent = "TOO WEAK!";
            tooWeakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            weakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive" ,"strongActive");
            mediumBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            strongBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            tooWeakBtn.classList.add("tooWeakactive");
        } else if (length >= 5 && length < 10 && (!useSymbols && !useNumbers)) {
            strengthLevel.textContent = "WEAK";
            tooWeakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            weakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            mediumBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            strongBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            tooWeakBtn.classList.add("weakActive");
            weakBtn.classList.add("weakActive");
        } else if (length >= 10 && length < 15 && (!useSymbols)) {
            strengthLevel.textContent = "MEDIUM";
            tooWeakBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            weakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            mediumBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            strongBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            tooWeakBtn.classList.add("mediumActive");
            weakBtn.classList.add("mediumActive");
            mediumBtn.classList.add("mediumActive");
        } else if(length >= 12 && length <= 20 && (useSymbols && useLowerCase && useNumbers && useUpperCase)) {
            strengthLevel.textContent = "STRONG";
            tooWeakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            weakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            mediumBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            strongBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            strongBtn.classList.add("strongActive");
            tooWeakBtn.classList.add("strongActive");
            weakBtn.classList.add("strongActive");
            mediumBtn.classList.add("strongActive");
            strongBtn.classList.add("strongActive");
        } else if (length >= 5 && length < 15 && (!useSymbols)) {
            strengthLevel.textContent = "WEAK";
            tooWeakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            weakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            mediumBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            strongBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            tooWeakBtn.classList.add("weakActive");
            weakBtn.classList.add("weakActive");
        } else {
            strengthLevel.textContent = "MEDIUM";
            tooWeakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            weakBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            mediumBtn.classList.remove("tooWeakactive", "weakActive", "mediumActive", "strongActive");
            strongBtn.classList.remove("tooWeakactive", "weakActive","mediumActive", "strongActive");
            tooWeakBtn.classList.add("mediumActive");
            weakBtn.classList.add("mediumActive");
            mediumBtn.classList.add("mediumActive");
        }

        if(newPassword.length >= 1) {
            copyImage.addEventListener('click', function() {
                copyTextToClipboard(newPassword);
            });
        }
        
        function copyTextToClipboard(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    copyText.style.display = "block";

                    setTimeout(function() {
                        copyText.style.display = "none";
                    }, 3000);
                }, function(err) {
                    console.error('Nepodařilo se zkopírovat text do schránky', err);
                });
            } else {
                console.warn('Clipboard API není podporováno');
            }
        }
    };

    generateButton.addEventListener('click', generatePassword);
    
});
