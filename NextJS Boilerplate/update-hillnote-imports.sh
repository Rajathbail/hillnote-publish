#!/bin/bash

# Update all imports from @/app/hillnoteDoc to @/hillnoteDoc

echo "Updating import paths from @/app/hillnoteDoc to @/hillnoteDoc..."

# Find and replace in all JavaScript/TypeScript files
find ./hillnoteDoc -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|@/app/hillnoteDoc|@/hillnoteDoc|g' {} +

echo "✅ Import paths updated successfully!"

# Show the results
echo ""
echo "Checking for any remaining @/app/hillnoteDoc imports:"
grep -r "@/app/hillnoteDoc" hillnoteDoc/ --include="*.jsx" --include="*.js" --include="*.tsx" --include="*.ts" || echo "✅ No @/app/hillnoteDoc imports found - all updated!"