import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    joinColumnName(relationName: string, referencedColumnName: string): string {
        if (relationName == 'pai') {
            let array = referencedColumnName.split('_');
            let nome = '';
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if (element == 'id') {
                    nome += '_pai_' + element;
                } else if (i == 0) {
                    nome += element;
                } else {
                    nome += '_' + element;
                }
            }
            return snakeCase(nome);
        } else {
            return snakeCase(relationName + '_' + referencedColumnName);
        }
    }

    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return snakeCase(columnName ? columnName : propertyName);
    }
    tableName(className: string, customName: string): string {
        return customName || snakeCase(className);
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        return snakeCase(embeddedPrefixes.join('_')) + (customName || snakeCase(propertyName));
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string): string {
        return snakeCase(`${firstTableName}_${firstPropertyName.replace(/\./gi, '_')}_${secondTableName}`);
    }

    //   joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    //     return snakeCase(`${tableName}_${columnName || propertyName}`);
    //   }

    classTableInheritanceParentColumnName(parentTableName: string, parentTableIdPropertyName: string): string {
        return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`);
    }
}
