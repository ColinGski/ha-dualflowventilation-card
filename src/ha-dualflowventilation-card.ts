import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, } from "lit/decorators.js";
import { DualFlowVentilationCardConfig } from "./ha-dualflowventilation-card-config";
  
@customElement('dual-flow-ventilation-card')
export class DualFlowVentilationCard extends LitElement {

    private config: DualFlowVentilationCardConfig;
    public hass? : any;

    printableValue(hass, airSensor, unit : string) {
        let state = hass.states[airSensor];
        return state ? `${state.state} ${unit}` : '-';
    }

    public render() {

        if (!this.config || !this.hass) {
            return html``;
        }

        const extractSensor = this.config.extract_air_entity;
        const exhaustSensor = this.config.exhaust_air_entity;
        const supplySensor = this.config.supply_air_entity;
        const outdoorSensor = this.config.outdoor_air_entity;
        const efficiencySensor = this.config.efficiency_entity;
        const cellStateSensor = this.config.cell_state_entity
        const humiditySensor = this.config.humidity_entity;
        const speedSensor = this.config.fan_speed_entity;

        return html`<ha-card>
                <div class="card-content">
                    <div class="dfvc-temperatures">
                        <div class="dfvc-temperatures-left">
                            <div class="dfvc-temperatures-extract">
                                <div class="dfvc-temp-label">Air intérieur</div>
                                <div class="dfvc-temp-value">${this.printableValue(this.hass, extractSensor, '°C')}</div>
                            </div>
                            <div class="dfvc-temperatures-supply">
                                <div class="dfvc-temp-value">${this.printableValue(this.hass, supplySensor, '°C')}</div>
                                <div class="dfvc-temp-label">Air neuf</div>
                            </div>
                        </div>
                        <div class="dfvc-temperatures-center">
                        </div>
                        <div class="dfvc-temperatures-right">
                            <div class="dfvc-temperatures-outdoor">
                                <div class="dfvc-temp-label">Air extérieur</div>
                                <div class="dfvc-temp-value">${this.printableValue(this.hass, outdoorSensor, '°C')}</div>
                            </div>
                            <div class="dfvc-temperatures-exhaust">
                                <div class="dfvc-temp-value">${this.printableValue(this.hass, exhaustSensor, '°C')}</div>
                                <div class="dfvc-temp-label">Air évacué</div>
                            </div>
                        </div>
                        <div class="dfvc-entities">
                            <div class="dfvc-efficiency dfvc-entity">
                                <div><ha-icon icon="mdi:gauge"></ha-icon></div>
                                <div class="dfvc-value">${this.printableValue(this.hass, efficiencySensor, '%')}</div>
                            </div>
                            <div class="dfvc-cell-state dfvc-entity">
                                <div><ha-icon icon="mdi:swap-horizontal-bold"></ha-icon></div>
                                <div class="dfvc-value">${this.printableValue(this.hass, cellStateSensor, '')}</div>
                            </div>
                            <div class="dfvc-humidity dfvc-entity">
                                <div><ha-icon icon="mdi:water-percent"></ha-icon></div>
                                <div class="dfvc-value">${this.printableValue(this.hass, humiditySensor, '%')}</div>
                            </div>
                            <div class="dfvc-fan-speed dfvc-entity">
                                <div><ha-icon icon="mdi:fan"></ha-icon></div>
                                <div class="dfvc-value">${this.printableValue(this.hass, speedSensor, '%')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ha-card>`;
    } 

    // The user supplied configuration. Throw an exception and Lovelace will
    // render an error card.
    setConfig(config : DualFlowVentilationCardConfig) {
        this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 3;
    }

    static get styles() {
        return css`
            .dfvc-temperatures {
                display: grid;
                grid-template-columns: auto 50px auto 35%;
                align-items: center;
                justify-items: center;
            }
            .dfvc-temperatures > .dfvc-temperatures-left {
                text-align: right;
            }
            .dfvc-temperatures > .dfvc-temperatures-right {
                text-align: left;
            }
            .dfvc-temperatures > .dfvc-temperatures-center {
                background-image: url(/local/vallox.png);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
                width: 50px;
                height: 50px;
            }                        
            .dfvc-temperatures-left > div, .dfvc-temperatures-right > div {
                padding-bottom: 10px;
                padding-top: 10px;
            }
            .dfvc-temp-label {
                color: var(--secondary-text-color);
            }
            .dfvc-temp-value {
                font-size: 150%;
            }
            .dfvc-entity {
                margin-bottom: 3px;
                display: grid;
                grid-template-columns: 30px auto;
            }
            .dfvc-entity .dfvc-value {
                text-align: right;
                align-self: center;
            }
            .dfvc-entities {
                border-left: 1px solid #555;
                padding-left: 20px;
                justify-self: stretch;
            }
        `;
    }
}