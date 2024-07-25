import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#2e64e5", // Removed alpha channel from color
    },
    inputField: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        textAlign: "center",
        width: "90%",
        marginBottom: 15,
    },
    addImage: {
        width: "100%",
        height: 250,
        marginBottom: 15,
    },
    statusWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    submitBtn: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#2e64e5", // Removed alpha channel from color
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    submitBtnText: {
        fontSize: 18,
        fontFamily: 'Lato-Bold',
        fontWeight: "bold",
        color: "#fff", // Changed text color to white
    },
});
