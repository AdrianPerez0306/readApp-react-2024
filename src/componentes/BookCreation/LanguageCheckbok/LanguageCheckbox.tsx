import { useEffect, useState } from "react";
import { authorService } from "../../../service/authorService";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const LanguageCheckbox = ({ 
    fullLanguageList, 
    nativeLanguage,
    onChange 
}: { 
    fullLanguageList: string[], 
    nativeLanguage: string,
    onChange: (selectedLanguages: string[]) => void 
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
            onChange(getSelectedLanguages());
            return updatedMap;
        });
    };

    return (
        <Box>
            <FormGroup sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                {Object.entries(languagesMap).map(([language, isChecked]) => (
                    <FormControlLabel
                        key={language}
                        control={
                            <Checkbox
                                checked={isChecked}
                                onChange={handleChange}
                                name={language}
                                disabled={language === nativeLanguage}
                            />
                        }
                        label={language}
                    />
                ))}
            </FormGroup>
        </Box>
    );
};
