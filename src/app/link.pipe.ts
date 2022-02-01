import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(value: any): any {
    
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return value.replace(urlRegex, (url:any)=> {
      let final = '<a target="_blank" class="colortext" href="' + url + '">' + url + '</a>';
      return final;
    })
  }

}