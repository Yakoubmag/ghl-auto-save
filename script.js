document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    window.saveToGHL = function() {
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
            "email": document.querySelector('input[name="email"]')?.value || "no-email@unknown.com",
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw"
        };

        console.log("🚀 Envoi des données au Webhook Zapier...", data);

        fetch("https://hooks.zapier.com/hooks/catch/16715744/2q43id3/", { // Ton Webhook Zapier ici
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => console.log("✅ Données envoyées à Zapier"))
        .catch(error => console.error("❌ Erreur d’envoi à Zapier :", error));
    };

    // ✅ Déclenchement automatique dès que 10 chiffres sont entrés
    let phoneField = document.querySelector("#phone");
    if (phoneField) {
        phoneField.addEventListener("input", function() {
            let phoneNumber = this.value.replace(/\D/g, ""); // Nettoyer le numéro

            if (phoneNumber.length >= 10) {
                console.log("📞 Numéro détecté avec 10 chiffres : Enregistrement automatique !");
                saveToGHL();
            }
        });
    }
});
