import { Injectable } from '@angular/core';
import { Work } from './common/work.model'

@Injectable({
  providedIn: 'root'
})
export class LinkWorkService {

  constructor() { }

  ALL_WORK: Work[] = [
    {
      url:"projet1",

      preview_img:"",
      preview_title:"",
      preview_description:"",

      title: "",
      subtitle: "",
      description1: "",
      description2: "",
      description3: "",
      image1: "",
      image2: "",
      image3: "",
    },
    {
      url:"projet2",

      preview_img:"",
      preview_title:"",
      preview_description:"",

      title: "",
      subtitle: "",
      description1: "",
      description2: "",
      description3: "",
      image1: "",
      image2: "",
      image3: "",
    },
    {
      url:"projet3",

      preview_img:"",
      preview_title:"",
      preview_description:"",

      title: "",
      subtitle: "",
      description1: "",
      description2: "",
      description3: "",
      image1: "",
      image2: "",
      image3: "",
    }
  ];
}
