import { Injectable } from '@angular/core';
import { Work } from './common/work.model'

@Injectable({
  providedIn: 'root'
})
export class LinkWorkService {

  constructor() { }

  HOME_WORK: Work[] = [
    {
      img:"../../assets/work/Group 3.png",
      description:"1 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
    {
      img:"../../assets/work/Group 3.png",
      description:"2 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
    {
      img:"../../assets/work/Group 3.png",
      description:"3 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
    {
      img:"../../assets/work/Group 3.png",
      description:"4 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
    {
      img:"../../assets/work/Group 3.png",
      description:"5 Lorem, ipsum dolor sit amet consectetur adipisicing",
    }
  ]

  ALL_WORK: Work[] = [
    {
      img:"../../assets/work/Group 3.png",
      description:"1 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
    {
      img:"../../assets/work/Group 3.png",
      description:"2 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
    {
      img:"../../assets/work/Group 3.png",
      description:"3 Lorem, ipsum dolor sit amet consectetur adipisicing",
    },
  ];
}
