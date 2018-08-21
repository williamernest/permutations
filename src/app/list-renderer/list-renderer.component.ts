import { Component, OnInit } from '@angular/core';
import ListItem from '../list-item';

@Component({
  selector: 'app-list-renderer',
  templateUrl: './list-renderer.component.html',
  styleUrls: ['./list-renderer.component.scss']
})

export class ListRendererComponent implements OnInit {

  lists: Array<List> = [];

  constructor() { }

  ngOnInit() {
    this.setLists();
  }

  setLists() {
    const variantTypes = [
      {},
      {twoLine: true},
      {dense: true},
      {nonInteractive: true},
    ];
    const variants = [];
    this.generateVariants({}, variantTypes, variants);
    const allVariants = this.removeDuplicates(this.getVariantsWithIcons(variants));
    allVariants.forEach(variant => {
      const list = new List(variant);
      const listWithSelectedItem = this.addSelectedListItem(variant);
      this.lists.push(list);
      this.lists.push(listWithSelectedItem);
    });
  }

  removeDuplicates(variants) {
    const uniqueStringifiedVariants = new Set();
    variants.forEach(variant => {
      const stringifiedVariant = JSON.stringify(variant);
      uniqueStringifiedVariants.add(stringifiedVariant);
    });
    return Array.from(uniqueStringifiedVariants).map(stringifiedVariant => JSON.parse(stringifiedVariant));
  }

  addSelectedListItem(variant) {
    const list = new List(variant);
    list.items[0].selected = true;
    return list;
  }

  getVariantsWithIcons(existingVariants) {
    const copy = existingVariants.slice();
    const listIcons = this.listItemIconVariants();
    existingVariants.forEach(existingVariant => {
      listIcons.forEach((listIcon) => {
        copy.push(Object.assign({}, existingVariant, listIcon));
      });
    });
    return copy;
  }

  generateVariants(currentVariant, remainingVariants, variants) {
    if (!remainingVariants.length) { return; }

    for (let i = 0; i < remainingVariants.length; i++) {
      const addedVariant = remainingVariants[i];
      const newVariant = Object.assign({}, currentVariant, addedVariant);
      variants.push(newVariant);
      const newRemaining = remainingVariants.filter((num, index) => index > i);
      this.generateVariants(newVariant, newRemaining, variants);
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
      {graphicImgPath: '../../assets/animal1.svg'},
      {graphicImgPath: '../../assets/animal2.svg'},
      {graphicImgPath: '../../assets/animal3.svg'},
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

  constructor(list) {
    if (!list.items || !list.items.length) {
      list.items = [{}, {}, {}];
    }
    this.items = list.items.map(listItem => new ListItem(listItem));

    this.twoLine = list.twoLine || this.twoLine;
    this.avatarList = list.avatarList || this.avatarList;
    this.dense = list.dense || this.dense;
    this.nonInteractive = list.nonInteractive || this.nonInteractive;
  }
}

