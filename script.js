document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    window.saveToZapier = function() {
        let phoneField = document.querySelector("#phone");
        if (!phoneField) {
            console.error("❌ Champ téléphone introuvable !");
            return;
        }

        let phoneNumber = phoneField.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres

        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }

        let data = {
            "firstName": document.querySelector("#full_name")?.value || "Inconnu",
            "email": document.querySelector('input[name="email"]')?.value || "no-email@example.com",
            "phone": phoneNumber
        };

        console.log("🚀 Envoi des données à Zapier...", data);

        // Utilisation de CORS Anywhere pour contourner CORS
        fetch("https://cors-anywhere.herokuapp.com/https://hooks.zapier.com/hooks/catch/16715744/2q43id3/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("✅ Données envoyées à Zapier !");
        })
        .catch(error => console.error("❌ Erreur d’envoi à Zapier :", error));
    };

    let phoneField = document.querySelector("#phone");
    if (phoneField) {
        phoneField.addEventListener("input", function() {
            let phoneNumber = this.value.replace(/\D/g, ""); // Nettoyer le numéro

            if (phoneNumber.length === 10) { // Dès que 10 chiffres sont saisis
                console.log("📞 Numéro détecté avec 10 chiffres : Envoi automatique à Zapier !");
                saveToZapier(); // Envoi les données à Zapier
            }
        });
    }
});
