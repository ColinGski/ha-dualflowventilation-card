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

    private showEntityInfo(entity)
    {
        const event = new Event("hass-more-info", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });

        (event as any).detail = {
            entityId: entity,
        };  

        this.dispatchEvent(event);

        return event;
    }

    private printableValue(airSensor) : string {
        let state = this.hass.states[airSensor];
        return (state ? (state.attributes.unit_of_measurement ? `${state.state} ${state.attributes.unit_of_measurement}` : state.state) : '-');
    }

    private renderTemperature(sensor, label) {
        return html`
            <div>
                <div class="dfvc-temp-label">${label}</div>
                <div class="dfvc-temp-value" @click="${ () => this.showEntityInfo(sensor) }">${this.printableValue(sensor)}</div>
            </div>`;
    }

    private renderExchangerState() {
        return html `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 50 50" xml:space="preserve">
               
                <desc>Created with Fabric.js 4.6.0</desc>

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
        `;
    }

    public render() : TemplateResult {

        if (!this.config || !this.hass) {
            return html``;
        }

        const currentPreset = this.hass.states[this.config.current_preset_entity].state;

        const presets = [
            { preset: 'Away', icon: 'home-off-outline' },
            { preset: 'Home', icon: 'home' },
            { preset: 'Boost', icon: 'flash' }
        ];

        const entities = [
            //{ entity: this.config.efficiency_entity, icon: 'gauge' },
            //{ entity: this.config.cell_state_entity, icon: 'swap-horizontal-bold' },
            { entity: this.config.humidity_entity, icon: 'water-percent' },
            { entity: this.config.fan_speed_entity, icon: 'fan' },
        ];

        let cell_state_entity = this.config.cell_state_entity;
        let efficiency_entity = this.config.efficiency_entity;

        return html`<ha-card>
                <div class="card-content">
                    <div class="dfvc-control-panel">
                        <div class="dfvc-overview">
                            <div class="dfvc-temperatures">
                                <div class="dfvc-temperatures-left">
                                    ${this.renderTemperature(this.config.extract_air_entity, 'Extract Air')}
                                    ${this.renderTemperature(this.config.supply_air_entity, 'Supply Air')}
                                </div>
                                <div class="dfvc-temperatures-center">
                                    ${this.renderExchangerState()}
                                </div>
                                <div class="dfvc-temperatures-right">
                                    ${this.renderTemperature(this.config.outdoor_air_entity, 'Outside Air')}
                                    ${this.renderTemperature(this.config.exhaust_air_entity, 'Exhaust Air')}
                                </div>
                            </div>
                            <div class="dfvc-cells-state">
                                <span @click="${ () => this.showEntityInfo(cell_state_entity) }">
                                    <ha-icon icon="mdi:swap-horizontal-bold"></ha-icon>
                                    ${this.printableValue(cell_state_entity)} (Efficiency ${this.printableValue(efficiency_entity)})
                                </span>
                            </div>
                        </div>
                        <div class="dfvc-entities">
                            ${entities.map(i => html`
                                <div class="dfvc-entity" @click="${ () => this.showEntityInfo(i.entity) }">
                                    <div class="dfvc-icon"><ha-icon icon="mdi:${i.icon}"></ha-icon></div>
                                    <div class="dfvc-value">${this.printableValue(i.entity)}</div>
                                </div>`)}
                        </div>
                    </div>
                    
                    <div class="dfvc-profiles">
                        ${presets.map(i =>  html`
                            <button class="${ currentPreset == i.preset ? 'selected' : '' }" 
                                @click=${() => this.setPresetMode(i.preset)}><ha-icon icon="mdi:${i.icon}"></ha-icon>${i.preset}
                            </button>`)}
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
            .dfvc-control-panel {
                display: grid;
                grid-template-columns: auto 30%;
                border-radius: 12px;
                border: medium none;
                background-color: rgba(var(--rgb-primary-text-color), 0.05);
                margin-bottom: 12px;
                padding: 12px
            }
            .dfvc-temperatures {
                display: grid;
                grid-template-columns: auto 50px auto;
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
                width: 50px;
                height: 50px;
            }        
            .dfvc-cells-state {
                text-align: center;
            }            
            .dfvc-temperatures-left > div, .dfvc-temperatures-right > div {
                padding: 10px;
            }
            .dfvc-temp-label {
                color: var(--secondary-text-color);
            }
            .dfvc-temp-value {
                font-size: 150%;
                cursor: pointer;
            }
            .dfvc-entity {
                margin-bottom: 10px;
                text-align: center;
            }
            .dfvc-entity .dfvc-icon {
                color: var(--secondary-text-color);
                margin-bottom: 5px;
            }
            .dfvc-entity .dfvc-value {
                font-size: 150%;
                cursor: pointer;
            }
            .dfvc-entities {
                border-left: 1px solid #555;
                padding-left: 20px;
                align-self: center;
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
                color: var(--primary-text-color);
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