#!/bin/bash

echo "Updating all @/app/hillnoteDoc imports to @/hillnoteDoc..."

# Update all files in app directory
find ./app -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/app/hillnoteDoc|@/hillnoteDoc|g' {} +

# Update all files in src directory if it exists
if [ -d "./src" ]; then
  find ./src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/app/hillnoteDoc|@/hillnoteDoc|g' {} +
fi

# Update scripts directory
find ./scripts -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.mjs" \) -exec sed -i '' 's|@/app/hillnoteDoc|@/hillnoteDoc|g' {} +

echo "✅ All import paths updated successfully!"

# Show results
echo ""
echo "Checking for any remaining @/app/hillnoteDoc imports:"
grep -r "@/app/hillnoteDoc" . --include="*.jsx" --include="*.js" --include="*.tsx" --include="*.ts" --include="*.mjs" --exclude-dir=node_modules --exclude-dir=.next || echo "✅ No @/app/hillnoteDoc imports found - all updated!"