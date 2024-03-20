import React from "react";
import { themeColor, useTheme, Section, SectionContent, SectionImage } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export function CandyItem(props, candy_info) {
    const { IsDarkMode } = useTheme();
    return (<Section>

        <Text fontWeight="bold" // ID
            style={{
                marginBottom: 5,
                color: props.focused
                    ? isDarkmode
                        ? themeColor.white100
                        : themeColor.primary
                    : "rgb(143, 155, 179)",
                fontSize: 10,
            }}>
            {candy_info.id}
        </Text>
        <Text fontWeight="bold" // Name
            style={{
                marginBottom: 5,
                color: props.focused
                    ? isDarkmode
                        ? themeColor.white100
                        : themeColor.primary
                    : "rgb(143, 155, 179)",
                fontSize: 10,
            }}>
            {candy_info.name}
        </Text>
        <SectionImage source={{ uri: candy_info.img_url }} // Image
            style={{ width: 200, height: 200 }} // Specify dimensions} 
        />
        <SectionContent>
            <Text fontWeight="bold" // Description
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? isDarkmode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)",
                    fontSize: 10,
                }}>
                {candy_info.desc}
            </Text>
            <Text fontWeight="bold" // Price
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? isDarkmode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)",
                    fontSize: 10,
                }}>
                {candy_info.price}
            </Text>
            <Text fontWeight="bold"
                style={{
                    marginBottom: 5,
                    color: props.focused
                        ? isDarkmode
                            ? themeColor.white100
                            : themeColor.primary
                        : "rgb(143, 155, 179)",
                    fontSize: 10,
                }}>
                {candy_info.prod_url}
            </Text>
        </SectionContent>
    </Section>);
}