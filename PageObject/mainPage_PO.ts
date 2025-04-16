import { Page} from "@playwright/test";
import {mainPageSelectors} from "../Selectors/mainPageSelectors.ts"


const createMainPage = (page : Page) => {
    const mainPage ={    
        clickBurgerButton: async() => {
            await page.waitForSelector(mainPageSelectors.BURGER_BUTTON)
            await page.click(mainPageSelectors.BURGER_BUTTON)
        },
        getProfileName:  () => {
            return page.innerText(mainPageSelectors.PROFILE_NAME)
        }
        
    }
    return mainPage
}

export {createMainPage}