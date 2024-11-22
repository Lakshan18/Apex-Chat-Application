const { Alert } = require("react-native");

const testReq = async () => {

    const Obejct = {
        test1: "Hello",
    }

    const response = await fetch("http://10.0.2.2:8080/Apex_Chat/Test",
        {
            method: "POST",
            body: JSON.stringify(Obejct),
            headers: {
                "Contente-Type": "application/json",
            },

        }

    );

    if (response.ok) {
        const responseJson = await response.json();

        if (responseJson.success) {
            Alert.alert("message", responseJson.message);
        }
    }

}