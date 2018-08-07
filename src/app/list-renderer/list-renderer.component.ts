import { Component, OnInit } from '@angular/core';
import ListItem from '../list-item';

@Component({
  selector: 'app-list-renderer',
  templateUrl: './list-renderer.component.html',
  styleUrls: ['./list-renderer.component.css']
})

export class ListRendererComponent implements OnInit {

  lists: Array<List> = [];

  constructor() { }

  ngOnInit() {
    const variantTypes = [
      {},
      {twoLine: true},
      {dense: true},
      {nonInteractive: true},
    ];
    const stringifiedVariants = new Set();
    this.generateStringifiedVariants({}, variantTypes, stringifiedVariants);
    const variants = Array.from(stringifiedVariants).map(stringifiedVariant => JSON.parse(stringifiedVariant));
    const allVariants = this.getVariantsWithIcons(variants);
    allVariants.forEach(variant => {
      const list = new List();
      if (variant.items && variant.items.length) {
        list.items = variant.items.map(listItem => new ListItem(listItem));
      }
      this.lists.push(list);
    })
  }

  getVariantsWithIcons(existingVariants) {
    const copy = existingVariants.slice();
    const listIcons = this.listItemIconVariants();
    existingVariants.forEach(existingVariants => {
      listIcons.forEach((listIcons) => {
        copy.push(Object.assign({}, existingVariants, listIcons));
      });
    });
    return copy;
  }

  generateStringifiedVariants(currentVariant, remainingVariants, variants) {
    if (!remainingVariants.length) return;
  
    for (let i=0; i<remainingVariants.length; i++) {
      const addedVariant = remainingVariants[i];
      const newVariant = Object.assign({}, currentVariant, addedVariant);
      const stringifiedNewVariant = JSON.stringify(newVariant);
      variants.add(stringifiedNewVariant);
      const newRemaining = remainingVariants.filter((num, index) => index > i);
      this.generateStringifiedVariants(newVariant, newRemaining, variants);
    }
  }

  listItemIconVariants() {
    const graphicIcons = [
      {graphicIcon: 'bluetooth'},
      {graphicIcon: 'network_wifi'},
      {graphicIcon: 'data_usage'},
    ];
    const graphicText = [
      {graphicText: ''},
      {graphicText: ''},
      {graphicText: ''},
    ];
    const graphicImgPaths = [
      {graphicImgPath: 'assets/animal1.svg'},
      {graphicImgPath: 'assets/animal2.svg'},
      {graphicImgPath: 'assets/animal3.svg'},
    ];
    const metaIcons = [
      {metaIcon: 'info'},
      {metaIcon: 'info'},
      {metaIcon: 'info'},
    ];
    const metaText = [
      {metaText: '$10.00'},
      {metaText: '$49.99'},
      {metaText: '$250.00'},
    ];

    return [
      {},
      Object.assign({}, {items: graphicIcons}),
      Object.assign({}, {items: graphicText}),
      Object.assign({}, {items: graphicImgPaths}),
      Object.assign({avatarList: true}, {items: graphicImgPaths}),
      Object.assign({}, {items: metaIcons}),
      Object.assign({}, {items: metaText}),
      Object.assign({}, {items: graphicIcons.map((graphic, index) => Object.assign({}, graphic, metaIcons[index]))}), 
      Object.assign({}, {items: graphicText.map((graphic, index) => Object.assign({}, graphic, metaIcons[index]))}),
      Object.assign({}, {items: graphicImgPaths.map((graphic, index) => Object.assign({}, graphic, metaIcons[index]))}),
      Object.assign({avatarList: true}, {items: graphicImgPaths.map((graphic, index) => Object.assign({}, graphic, metaIcons[index]))}),
      Object.assign({}, {items: graphicIcons.map((graphic, index) => Object.assign({}, graphic, metaText[index]))}),
      Object.assign({}, {items: graphicText.map((graphic, index) => Object.assign({}, graphic, metaText[index]))}),
      Object.assign({}, {items: graphicImgPaths.map((graphic, index) => Object.assign({}, graphic, metaText[index]))}),
      Object.assign({avatarList: true}, {items: graphicImgPaths.map((graphic, index) => Object.assign({}, graphic, metaText[index]))}),
    ];
  }


}

class List {
  items: Array<ListItem> = [];
  twoLine = false;
  avatarList = false;
  dense = false;
  nonInteractive = false;
}

