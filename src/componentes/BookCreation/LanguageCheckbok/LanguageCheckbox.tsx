import { useEffect, useState } from "react";
import { authorService } from "../../../service/authorService";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const LanguageCheckbox = ({ 
    fullLanguageList, 
    nativeLanguage,
    onChange,
    editable
}: { 
    fullLanguageList: string[], 
    nativeLanguage: string,
    onChange: (selectedLanguages: string[]) => void,
    editable: boolean
}) => {

    const [languagesMap, setLanguagesMap] = useState<Record<string, boolean>>({});

    const mapConvertion = (languages: string[]) => {
        return languages.reduce((accumulator, language) => {
            accumulator[language] = false;
            return accumulator;
        }, {} as Record<string, boolean>);
    };

    const mapSetter = (map: Record<string, boolean>, list: string[]) => {
        list.forEach((language) => {
            if (map.hasOwnProperty(language)) {
                map[language] = true;
            }
        });

        if (map.hasOwnProperty(nativeLanguage)) {
            map[nativeLanguage] = true;
        }
    };

    const getLanguages = async () => {
        const languages = await authorService.getIdiomas();
        const languagesMap = mapConvertion(languages);
        mapSetter(languagesMap, fullLanguageList);
        setLanguagesMap(languagesMap);
    };

    useEffect(() => {
        getLanguages();
    }, [fullLanguageList, nativeLanguage]);

    const getSelectedLanguages = () => {
        return Object.keys(languagesMap).filter((language) => languagesMap[language]);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setLanguagesMap((prevMap) => {
            const updatedMap = {
                ...prevMap,
                [name]: checked,
            };
            // Llamar a onChange después de actualizar el mapa de lenguajes
            onChange(Object.keys(updatedMap).filter((language) => updatedMap[language]));
            return updatedMap;
        });
    };
    

    return (
        <Box>
            <FormGroup>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 1fr)"
                    gap={1}
                >
                    {Object.entries(languagesMap).map(([language, isChecked]) => (
                        <FormControlLabel
                            key={language}
                            control={
                                <Checkbox
                                    checked={isChecked}
                                    onChange={handleChange}
                                    name={language}
                                    disabled={(language === nativeLanguage) || !editable}
                                />
                            }
                            label={language}
                        />
                    ))}
                </Box>
            </FormGroup>
        </Box>
    );
};
