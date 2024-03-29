import React from "react";
import { StyleSheet } from "react-native";
import { themeColor, useTheme, Section, SectionContent, SectionImage, Text } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "../../api/AwesomeStoreServices";

/**
 * Creates a new
 * @param {object} props
 * @param {Item} item
 * @returns {React.JSX.Element} A new item card.
 */
export default function ItemCard(props) {
    const { IsDarkMode } = useTheme();

    return (<Section>

        <Text fontWeight="normal" // ID
            italic="true"
            style={{
                marginBottom: 5,
                color: props.focused
                    ? IsDarkMode
                        ? themeColor.white100
                        : themeColor.primary
                    : "grey",
            }}>
            {props.id}
        </Text>
        <Text fontWeight="bold" // Name
            style={{
                marginBottom: 5,
                color: props.focused
                    ? IsDarkMode
                        ? themeColor.white100
                        : themeColor.primary
                    : "black",

            }}>
            {props.name}
        </Text>
        <SectionImage source={{ uri: props.img_url }} // Image
            style={{ width: 200, height: 200 }} // Specify dimensions} 
        />
        <SectionContent>
            <Text fontWeight="bold" // Description
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? IsDarkMode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)",
                    fontSize: 10,
                }}>
                {props.desc}
            </Text>
            <Text fontWeight="bold" // Price
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? IsDarkMode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)"
                }}>
                {props.price}
            </Text>
            <Text fontWeight="bold" // Product url
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? IsDarkMode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)"
                }}>
                {props.prod_url}
            </Text>
        </SectionContent>
    </Section>);
}