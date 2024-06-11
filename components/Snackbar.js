import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Snackbar = ({
    message,
    actionText,
    onActionPress,
    duration = 1500, // Default duration in milliseconds
    position = "bottom", // Default position
    containerStyle,
    messageStyle,
    actionTextStyle,
    backgroundColor,
    textColor,
    actionTextColor,
    isVisible,
    onDismiss,
}) => {
    useEffect(() => {
        let timeout;
        if (isVisible) {
            timeout = setTimeout(() => {
                onDismiss();
            }, duration);
        }
        return () => clearTimeout(timeout);
    }, [isVisible, duration, onDismiss]);

    return isVisible ? (
        <View
            style={[
                styles.container,
                position === "top" ? styles.topContainer : styles.bottomContainer,
                containerStyle,
                { backgroundColor: backgroundColor },
            ]}
        >
            <FontAwesome name="info-circle" size={24} color='gray' style={{ marginRight: 8 }} />
            <Text style={[styles.messageText, messageStyle, { color: textColor }]}>
                {message}
            </Text>
            {actionText && (
                <TouchableOpacity onPress={onActionPress}>
                    <Text
                        style={[
                            styles.actionText,
                            actionTextStyle,
                            { color: actionTextColor },
                        ]}
                    >
                        {actionText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        right: 0,
    },
    topContainer: {
        top: 0,
    },
    bottomContainer: {
        bottom: 80,
    },
    messageText: {
        fontSize: 16,
        //alignSelf: "center",
    },
    actionText: {
        marginLeft: 8,
        fontSize: 14,
    },
});

export default Snackbar;
