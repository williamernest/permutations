
export default class ListItem {
  primaryLabel = 'Primary label';
  secondaryLabel: 'Secondary Label';
  selected = false;
  graphicIcon: string;
  graphicText: string;
  graphicImgPath: string;
  metaIcon: string;
  metaText: string;

  constructor(newListItem) {
    if (newListItem.primaryLabel) {
      this.primaryLabel = newListItem.primaryLabel;
    }
    if (newListItem.secondaryLabel) {
      this.secondaryLabel = newListItem.secondaryLabel;
    }
    if (newListItem.selected) {
      this.selected = newListItem.selected;
    }
    if (newListItem.graphicIcon) {
      this.graphicIcon = newListItem.graphicIcon;
    }
    if (newListItem.graphicText) {
      this.graphicText = newListItem.graphicText;
    }
    if (newListItem.graphicImgPath) {
      this.graphicImgPath = newListItem.graphicImgPath;
    }
    if (newListItem.metaIcon) {
      this.metaIcon = newListItem.metaIcon;
    }
    if (newListItem.metaText) {
      this.metaText = newListItem.metaText;
    }
  }
}
