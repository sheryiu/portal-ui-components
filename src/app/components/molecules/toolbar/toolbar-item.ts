export abstract class ToolbarItem {
  public abstract type: string;
  static ID = 0;
  id = `app-toolbar-item-${ ToolbarItem.ID++ }`
}