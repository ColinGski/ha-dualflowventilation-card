import { LitElement, html, css, CSSResultGroup, TemplateResult } from "lit";
import { customElement, } from "lit/decorators.js";
import { DualFlowVentilationCardConfig } from "./dual-flow-ventilation-card-config";
  
@customElement('dual-flow-ventilation-card')
export class DualFlowVentilationCard extends LitElement {

    private config?: DualFlowVentilationCardConfig;
    public hass? : any;

    static get properties() {
        return {
          hass: {},
          config: {},
        };
      }

    private printableValue(hass, airSensor, unit : string) : string {
        let state = hass.states[airSensor];
        return (state ? `${state.state} ${unit}` : '-').trim();
    }

    public render() : TemplateResult {

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
        const currentPresetSensor = this.config.current_preset_entity;

        const currentPreset = this.printableValue(this.hass, currentPresetSensor, '');

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
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 50 50" xml:space="preserve">
                            <desc>Created with Fabric.js 4.6.0</desc>
                            <defs>
                            </defs>
                            <g transform="matrix(0.62 0 0 0.53 24 25)" id="tRjiNB6GNj8ZKCBHF_5um"  >
                            <path style="stroke: rgb(114,114,114); stroke-width: 3; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(242,242,242); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M 16.23943 -28.12732 L 32.47864 0 L 16.23943 28.12732 L -16.23943 28.12732 L -32.47864 0 L -16.23943 -28.12732 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(0.2 0 0 0.3 25.5 24)" id="MsTeVBfavi5luTNjGOiGS"  >
                            <path style="stroke: rgb(49,168,247); stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -110 40 L -90 40 L 90 -40 L 110 -40" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(0 -0.1 0.06 0 2.5 36)" id="ZQElss-eOJlMrdixjCwS7"  >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(49,168,247); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-40, -40)" d="M 60 40 L 80 80 L 40 80 L 0 80 L 20 40 L 40 0 L 60 40 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(0 -0.1 -0.06 0 47.5 36)" id="tJXkie3lntCwzfM0th5MP"  >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(49,168,247); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-40, -40)" d="M 60 40 L 80 80 L 40 80 L 0 80 L 20 40 L 40 0 L 60 40 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(-0.19 0 0 0.3 24 24)" id="RR9eEmjzxuPtw2nl0KhXz"  >
                            <path style="stroke: rgb(49,168,247); stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -110 40 L -90 40 L 90 -40 L 110 -40" stroke-linecap="round" />
                            </g>
                            </svg>
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
                    <div class="dfvc-profiles">
                        <button class="${ currentPreset == "Away" ? 'selected' : '' }" @click=${(e) => this.setPresetMode('Away')}><ha-icon icon="mdi:fan"></ha-icon>Away</button>
                        <button class="${ currentPreset == "Home" ? 'selected' : '' }" @click=${(e) =>this.setPresetMode('Home')}><ha-icon icon="mdi:door-closed"></ha-icon>Home</button>
                        <button class="${ currentPreset == "Boost" ? 'selected' : '' }" @click=${(e) =>this.setPresetMode('Boost')}><ha-icon icon="mdi:flash"></ha-icon>Boost</button>
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

    setPresetMode(preset : string) {
        if (!this.config || !this.hass || !this.config.fan_entity) return;

        console.log(`Changing preset to ${preset}`);
        this.hass.callService('fan', 'set_preset_mode', { preset_mode: preset }, { entity_id: this.config.fan_entity }); 
    }

    static get styles() {
        return css`
            .dfvc-temperatures {
                display: grid;
                grid-template-columns: auto 50px auto 35%;
                align-items: center;
                justify-items: center;
                border-radius: 12px;
                border: medium none;
                background-color: rgba(var(--rgb-primary-text-color), 0.05);
                margin-bottom: 12px;
                padding: 12px
            }
            .dfvc-temperatures > .dfvc-temperatures-left {
                text-align: right;
            }
            .dfvc-temperatures > .dfvc-temperatures-right {
                text-align: left;
            }
            .dfvc-temperatures > .dfvc-temperatures-center {
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
            .dfvc-profiles {
                display: flex;
            }
            .dfvc-profiles > button {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 42px; /* Mushroom like */
                border-radius: 12px; /* Mushroom like */
                border: medium none;
                background-color: rgba(var(--rgb-primary-text-color), 0.05);
                transition: background-color 280ms ease-in-out 0s;
                font-size: var(--control-height);
                margin: 0px;
                padding: 0px;
                box-sizing: border-box;
                line-height: 0;
            }
            .dfvc-profiles > button.selected {
                color: #555;
                background: #eee;
              }
            .dfvc-profiles > button > ha-icon {
                margin-right: 12px;
            }
            .dfvc-profiles > button:not(:last-child)
            {
              margin-right: 12px;
            }
        `;
    }
}