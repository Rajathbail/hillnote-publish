import { siteConfig } from "@/hillnoteDoc/config/site.config"

// Build a tree structure from flat document and folder lists
export function buildFileTree(registry) {
  const tree = []
  const nodeMap = new Map()
  const orderMap = new Map()
  
  // Store original order from registry
  registry.documents?.forEach((doc, index) => {
    orderMap.set(doc.path, index)
  })
  
  registry.folders?.forEach((folder, index) => {
    orderMap.set(folder.path, index + (registry.documents?.length || 0))
  })
  
  // Create all folders first
  registry.folders?.forEach(folder => {
    const pathParts = folder.path.split('/')
    const folderName = pathParts[pathParts.length - 1]
    const node = {
      id: folder.path,
      name: folderName,
      type: 'directory',
      path: folder.path,
      emoji: folder.emoji || '📁',
      children: []
    }
    nodeMap.set(folder.path, node)
  })
  
  // Create all documents
  registry.documents?.forEach(doc => {
    const pathParts = doc.path.split('/')
    const fileName = pathParts[pathParts.length - 1]
    const node = {
      id: doc.path,
      name: fileName,
      type: 'file',
      path: doc.path,
      emoji: doc.emoji || '🌵'
    }
    nodeMap.set(doc.path, node)
  })
  
  // Build the tree structure
  nodeMap.forEach((node, path) => {
    const pathParts = path.split('/')
    
    // Skip the 'documents' part and check if this is a root item
    if (pathParts.length === 2) {
      // Root level item (documents/file.md or documents/folder)
      tree.push(node)
    } else if (pathParts.length > 2) {
      // Find parent folder
      const parentPath = pathParts.slice(0, -1).join('/')
      const parent = nodeMap.get(parentPath)
      
      if (parent && parent.children) {
        parent.children.push(node)
      } else {
        // If parent doesn't exist, add to root
        tree.push(node)
      }
    }
  })
  
  // Sort children based on custom order or registry order
  const sortNodes = (nodes) => {
    nodes.sort((a, b) => {
      // Check if custom order is defined and contains these paths
      if (siteConfig.workspace.customOrder && siteConfig.workspace.customOrder.length > 0) {
        const customIndexA = siteConfig.workspace.customOrder.indexOf(a.path)
        const customIndexB = siteConfig.workspace.customOrder.indexOf(b.path)
        
        // If both are in custom order, use that
        if (customIndexA !== -1 && customIndexB !== -1) {
          return customIndexA - customIndexB
        }
        
        // If only A is in custom order, it comes first
        if (customIndexA !== -1) return -1
        
        // If only B is in custom order, it comes first
        if (customIndexB !== -1) return 1
      }
      
      // Always fall back to registry order for items not in customOrder
      const orderA = orderMap.get(a.path) ?? Number.MAX_SAFE_INTEGER
      const orderB = orderMap.get(b.path) ?? Number.MAX_SAFE_INTEGER
      
      return orderA - orderB // Lower index comes first
    })
    
    // Recursively sort children
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        sortNodes(node.children)
      }
    })
  }
  
  sortNodes(tree)
  return tree
}

// Fetch workspace registry from public folder
export async function fetchWorkspaceRegistry() {
  if (!siteConfig.workspace.enabled) {
    return null
  }
  
  try {
    const registryPath = `${siteConfig.workspace.path}${siteConfig.workspace.registryFile}`
    const response = await fetch(registryPath)
    
    if (!response.ok) {
      console.error('Failed to fetch workspace registry:', response.statusText)
      return null
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading workspace registry:', error)
    return null
  }
}

// Get file tree from workspace
export async function getWorkspaceFileTree() {
  const registry = await fetchWorkspaceRegistry()
  
  if (!registry) {
    return []
  }
  
  return buildFileTree(registry)
}