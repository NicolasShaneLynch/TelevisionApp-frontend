import { Pipe, PipeTransform } from '@angular/core';
import {DASHBOARD_HEADER} from "../constants";

/** Pipe che imposta il titolo della pagina dall'url */
@Pipe({
  standalone: true,
  name: 'setTextByUrl',
  pure: false,
})
export class SetTextByUrlPipe implements PipeTransform {
  /**
   * Ritorna il titolo della pagina usando il path o una string vuota se non trovato
   * @param {string} value Non usato ma necessario per l'interfaccia
   * @param {any} array L'Array da usare per recupare la string da usare nel titolo
   * @param {string} key La chiave da usare nell'Array
   * @returns {string} Il titolo
   */


  conform(value: string, pathname: string): string {
    {
      value=value+"..";
      pathname=pathname+"..";
      let pathnameLen=pathname.length;
      let valueLen=value.length;
      let jollyLocations:number[]=[];
      let jollyIndex = 0;
      for (let i= 0;i<valueLen;i++) {
        if (value[i]=='*') {
          jollyLocations[jollyIndex]=i;
          jollyIndex++;
        }
      }
      let jollyLen=jollyLocations.length;
      jollyIndex=0;
      if (value.substring(0,jollyLocations[jollyIndex])!=pathname.substring(0,jollyLocations[jollyIndex])) return "";
      let segmentLen=0;
      let pathnameIndex= jollyLocations[jollyIndex];
      for (let i= 0;i<jollyLen-1;i++) {
        let valueIndex= jollyLocations[jollyIndex]+1;
        segmentLen= jollyLocations[jollyIndex+1]-valueIndex;
        if (pathnameLen<=pathnameIndex+segmentLen) return "";
        while (value.substring(valueIndex,valueIndex+segmentLen)!=pathname.substring(pathnameIndex,pathnameIndex+segmentLen)) {
          pathnameIndex++;
          if (pathnameLen<=pathnameIndex+segmentLen) return "";
        }
      }
      jollyIndex=jollyLen-1;
      segmentLen=valueLen-(jollyLocations[jollyIndex]+1);
      if (value.substring(jollyLocations[jollyIndex]+1,valueLen)!=pathname.substring(pathnameLen-segmentLen,pathnameLen)) return "";
      return value.substring(0,valueLen-2);
    }
  }

  jolly(pathname: string): string {
    let DashboardHeaderKeys = Object.keys(DASHBOARD_HEADER);
    for (let i=0;i<DashboardHeaderKeys.length;i++) {
      let res=this.conform(DashboardHeaderKeys[i],pathname);
      if (res!="") return res;
    }
    return "";
  }
  transform(value: string, array: any, key: string): string {
    let pathname = location.pathname;
    if (this.jolly(pathname)!="") pathname=this.jolly(pathname);
    return array[pathname] ? array[pathname][key] ?? '' : '';
  }
}
