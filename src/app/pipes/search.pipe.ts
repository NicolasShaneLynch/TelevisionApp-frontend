import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone:true,
    name: 'filtroPerInizioNome'
})
export class FiltroPerInizioNomePipe implements PipeTransform {
    transform(lista: any[], inizioNome: string): any[] {
        if (!lista || !inizioNome) {
            return lista;
        }

        return lista.filter(prodotto => prodotto.name.toLowerCase().startsWith(inizioNome.toLowerCase()));
    }
}
@Pipe({
    standalone:true,
    name: 'filtroPerTipo'
})
export class FiltroPerTipo implements PipeTransform {
    transform(lista: any[], tipo: string): any[] {
        if (!lista || !tipo) {
            return lista;
        }
        if(!(tipo.toLowerCase() === "vod" || tipo.toLowerCase()==="live")) return lista;

        return lista.filter(prodotto => prodotto.type.toLowerCase().includes(tipo.toLowerCase()));
    }
}
@Pipe({
    standalone:true,
    name: 'filtroPerPrezzo'
})
export class PriceFilter implements PipeTransform {
    transform(lista: any[], prezzo: string): any[] {
        if (!lista || !prezzo) {
            return lista;
        }
        console.log(typeof prezzo);
        if(prezzo.toLowerCase() === 'costo'){ return lista; }

        return lista.filter(prodotto => prodotto.price <= Number(prezzo));
    }
}