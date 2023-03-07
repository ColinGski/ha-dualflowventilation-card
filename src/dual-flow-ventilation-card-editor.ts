import { LitElement, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { DualFlowVentilationCardConfig } from "./dual-flow-ventilation-card-config";

@customElement('dual-flow-ventilation-card-editor')
export class DualFlowVentilationCardEditor extends LitElement {

    private config?: DualFlowVentilationCardConfig;
    public hass? : any;

    static get properties() {
        return {
          hass: {},
          config: {},
        };
      }

    public setConfig(config: DualFlowVentilationCardConfig): void {
        this.config = config;
    }

    public render() : TemplateResult {

        if (!this.hass || !this.config) {
            return html``;
        }

        const schema = 
        [
            { name : 'fan_entity', selector: { entity: {} } },
            { name : 'exhaust_air_entity', selector: { entity: {} } },
            { name : 'outdoor_air_entity', selector: { entity: {} } },
            { name : 'fan_speed_entity', selector: { entity: {} } },
            { name : 'humidity_entity', selector: { entity: {} } },
            { name : 'cell_state_entity', selector: { entity: {} } },
            { name : 'efficiency_entity', selector: { entity: {} } },
            { name : 'supply_air_entity', selector: { entity: {} } },
            { name : 'extract_air_entity', selector: { entity: {} } },
            { name : 'current_preset_entity', selector: { entity: {} } },
        ]

        //                 .computeLabel=${this._computeLabel}

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${schema}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `
    }

    private _valueChanged(ev: CustomEvent): void {
        const event = new Event("config-changed", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });

        (event as any).detail = {
            config: ev.detail.value,
        };  

        this.dispatchEvent(event);
    }
}