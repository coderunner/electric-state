import {eState} from "./module/config.js";
import { YearZeroRollManager } from "./module/lib/yzur.js";
import { preloadHandlebarsTemplates } from "./module/templates.js";
import { registerSystemSettings } from "./module/settings.js";
import electricStateActorSheet from "./module/actor/sheet.js";
import electricStateActor from "./module/actor/entity.js";
import electricStateItemSheet from "./module/item/sheet.js";
import electricStateItem from "./module/item/entity.js";



Hooks.once("init", function() {
    console.log("E-STATE | Initializing Electric State");

    game.electricState = {
        applications: {
            electricStateActor,
            electricStateActorSheet,
            electricStateItem,
            electricStateItemSheet
        },
        config: eState,
        entities: {
            electricStateActor,
            electricStateItem
        }
    }

    CONFIG.eState = eState;
    console.log(CONFIG.eState);
    CONFIG.Actor.documentClass = electricStateActor; 
    // CONFIG.Item.documentClass = tftloopItem;  
    
    // Register System Settings
    registerSystemSettings();

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("electric-state", electricStateActorSheet, { makeDefault: true });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("electric-state", electricStateItemSheet, { smakeDefault: true });

    preloadHandlebarsTemplates();

    Handlebars.registerHelper("times", function(n, content) {
        let result = "";
        for (let i = 0; i < n; ++i){
            content.data.index = i + 1;
            result = result + content.fn(i);
        }
        
        return result;
    });


Handlebars.registerHelper("ifIn", function (elem, list, options) {
    if (list && list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });


    YearZeroRollManager.register("es", {
        "ROLL.baseTemplate": "systems/electric-state/templates/dice/broll.hbs",
        "ROLL.chatTemplate": "systems/electric-state/templates/dice/roll.hbs",
        "ROLL.tooltipTemplate": "systems/electric-state/templates/dice/tooltip.hbs",
        "ROLL.infosTemplate": "systems/electric-state/templates/dice/infos.hbs",
      });
})