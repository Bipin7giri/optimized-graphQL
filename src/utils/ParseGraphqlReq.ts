interface Relations {
    [key: string]: string[] | Relations;
  }
  
  export function parseSelectionSet(selections: any[]): { parentTable: string[], relations: Relations } {
    const userFields: string[] = [];
    const relations: Relations = {};
  
    selections.forEach((selection) => {
      const fieldName: string = selection.name.value;
  
      if (selection.selectionSet) {
        // Field has nested selections (is a relation)
        const nestedFields = parseSelectionSet(selection.selectionSet.selections);
        relations[fieldName] = nestedFields.parentTable.length > 0 ? nestedFields.parentTable : nestedFields.relations;
      } else {
        // Field is part of the user
        userFields.push(fieldName);
      }
    });
  
    return { parentTable: userFields, relations };
  }