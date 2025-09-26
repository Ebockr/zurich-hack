import { NextRequest, NextResponse } from 'next/server';

// Sample network data - this would normally come from your backend
const sampleNetworkData = {
  nodes: [
    // Merchants
    { id: 'merchant-1', label: 'Amazon Store', type: 'merchant', data: { value: 95, category: 'E-commerce', status: 'verified', transactionVolume: 10500 } },
    { id: 'merchant-2', label: 'Local Grocery', type: 'merchant', data: { value: 88, category: 'Retail', status: 'verified', transactionVolume: 3200 } },
    { id: 'merchant-3', label: 'Gas Station XYZ', type: 'merchant', data: { value: 82, category: 'Fuel', status: 'verified', transactionVolume: 1800 } },
    { id: 'merchant-4', label: 'Online Casino', type: 'merchant', data: { value: 45, category: 'Gaming', status: 'flagged', transactionVolume: 8900 } },
    { id: 'merchant-5', label: 'Coffee Shop Chain', type: 'merchant', data: { value: 91, category: 'Food & Beverage', status: 'verified', transactionVolume: 4100 } },
    { id: 'merchant-6', label: 'Electronics Store', type: 'merchant', data: { value: 87, category: 'Electronics', status: 'verified', transactionVolume: 6700 } },
    { id: 'merchant-7', label: 'Clothing Boutique', type: 'merchant', data: { value: 84, category: 'Fashion', status: 'verified', transactionVolume: 2900 } },
    { id: 'merchant-8', label: 'Pharmacy Plus', type: 'merchant', data: { value: 93, category: 'Healthcare', status: 'verified', transactionVolume: 5200 } },
    { id: 'merchant-9', label: 'Fake Store LLC', type: 'merchant', data: { value: 12, category: 'Suspicious', status: 'flagged', transactionVolume: 15600 } },
    { id: 'merchant-10', label: 'Hotel Resort', type: 'merchant', data: { value: 89, category: 'Travel', status: 'verified', transactionVolume: 7800 } },
    
    // User Accounts
    { id: 'user-1', label: 'John Smith', type: 'user', data: { value: 85, category: 'Regular User', accountAge: 720, transactionCount: 156 } },
    { id: 'user-2', label: 'Sarah Johnson', type: 'user', data: { value: 92, category: 'Premium User', accountAge: 1200, transactionCount: 892 } },
    { id: 'user-3', label: 'Mike Wilson', type: 'user', data: { value: 78, category: 'Regular User', accountAge: 365, transactionCount: 45 } },
    { id: 'user-4', label: 'Emma Davis', type: 'user', data: { value: 88, category: 'Regular User', accountAge: 900, transactionCount: 234 } },
    { id: 'user-5', label: 'Robert Brown', type: 'user', data: { value: 15, category: 'Suspicious User', accountAge: 30, transactionCount: 67 } },
    { id: 'user-6', label: 'Lisa Anderson', type: 'user', data: { value: 90, category: 'Premium User', accountAge: 1500, transactionCount: 567 } },
    { id: 'user-7', label: 'David Miller', type: 'user', data: { value: 82, category: 'Regular User', accountAge: 600, transactionCount: 123 } },
    { id: 'user-8', label: 'Jennifer Taylor', type: 'user', data: { value: 95, category: 'VIP User', accountAge: 2100, transactionCount: 1250 } },
    { id: 'user-9', label: 'Fake Account 001', type: 'user', data: { value: 8, category: 'Bot Account', accountAge: 5, transactionCount: 234 } },
    { id: 'user-10', label: 'Tom Wilson', type: 'user', data: { value: 86, category: 'Regular User', accountAge: 800, transactionCount: 189 } },
    { id: 'user-11', label: 'Maria Garcia', type: 'user', data: { value: 89, category: 'Regular User', accountAge: 950, transactionCount: 345 } },
    { id: 'user-12', label: 'Scammer Bob', type: 'user', data: { value: 5, category: 'Fraudulent User', accountAge: 2, transactionCount: 89 } },
    { id: 'user-13', label: 'Anna White', type: 'user', data: { value: 91, category: 'Premium User', accountAge: 1100, transactionCount: 456 } },
    { id: 'user-14', label: 'Chris Martin', type: 'user', data: { value: 87, category: 'Regular User', accountAge: 700, transactionCount: 167 } },
    { id: 'user-15', label: 'Bot Network X', type: 'user', data: { value: 3, category: 'Bot Account', accountAge: 1, transactionCount: 456 } },
  ],
  edges: [
    // Legitimate Transactions - Users to Merchants
    { id: 'txn-1', source: 'user-1', target: 'merchant-1', label: '$125.50', weight: 8.5, type: 'transaction', isFraud: false },
    { id: 'txn-2', source: 'user-2', target: 'merchant-2', label: '$67.89', weight: 7.2, type: 'transaction', isFraud: false },
    { id: 'txn-3', source: 'user-3', target: 'merchant-3', label: '$45.00', weight: 6.8, type: 'transaction', isFraud: false },
    { id: 'txn-4', source: 'user-4', target: 'merchant-5', label: '$12.75', weight: 6.5, type: 'transaction', isFraud: false },
    { id: 'txn-5', source: 'user-6', target: 'merchant-6', label: '$899.99', weight: 9.2, type: 'transaction', isFraud: false },
    { id: 'txn-6', source: 'user-7', target: 'merchant-7', label: '$156.30', weight: 7.8, type: 'transaction', isFraud: false },
    { id: 'txn-7', source: 'user-8', target: 'merchant-8', label: '$45.67', weight: 6.9, type: 'transaction', isFraud: false },
    { id: 'txn-8', source: 'user-10', target: 'merchant-10', label: '$1,250.00', weight: 9.5, type: 'transaction', isFraud: false },
    { id: 'txn-9', source: 'user-11', target: 'merchant-1', label: '$78.95', weight: 7.3, type: 'transaction', isFraud: false },
    { id: 'txn-10', source: 'user-13', target: 'merchant-2', label: '$234.50', weight: 8.1, type: 'transaction', isFraud: false },
    { id: 'txn-11', source: 'user-14', target: 'merchant-3', label: '$55.00', weight: 6.8, type: 'transaction', isFraud: false },
    { id: 'txn-12', source: 'user-2', target: 'merchant-5', label: '$23.45', weight: 6.2, type: 'transaction', isFraud: false },
    { id: 'txn-13', source: 'user-1', target: 'merchant-6', label: '$567.80', weight: 8.7, type: 'transaction', isFraud: false },
    { id: 'txn-14', source: 'user-3', target: 'merchant-7', label: '$89.99', weight: 7.1, type: 'transaction', isFraud: false },
    { id: 'txn-15', source: 'user-4', target: 'merchant-8', label: '$34.56', weight: 6.4, type: 'transaction', isFraud: false },
    
    // Fraudulent Transactions - Suspicious patterns
    { id: 'fraud-1', source: 'user-5', target: 'merchant-4', label: '$5,000.00', weight: 9.8, type: 'transaction', isFraud: true },
    { id: 'fraud-2', source: 'user-9', target: 'merchant-9', label: '$2,350.00', weight: 9.1, type: 'transaction', isFraud: true },
    { id: 'fraud-3', source: 'user-12', target: 'merchant-4', label: '$1,890.00', weight: 8.9, type: 'transaction', isFraud: true },
    { id: 'fraud-4', source: 'user-15', target: 'merchant-9', label: '$3,450.00', weight: 9.3, type: 'transaction', isFraud: true },
    { id: 'fraud-5', source: 'user-5', target: 'merchant-9', label: '$890.00', weight: 8.2, type: 'transaction', isFraud: true },
    { id: 'fraud-6', source: 'user-9', target: 'merchant-1', label: '$1,200.00', weight: 8.5, type: 'transaction', isFraud: true },
    { id: 'fraud-7', source: 'user-12', target: 'merchant-6', label: '$2,100.00', weight: 8.8, type: 'transaction', isFraud: true },
    { id: 'fraud-8', source: 'user-15', target: 'merchant-2', label: '$750.00', weight: 7.9, type: 'transaction', isFraud: true },
    { id: 'fraud-9', source: 'user-5', target: 'merchant-3', label: '$1,500.00', weight: 8.6, type: 'transaction', isFraud: true },
    { id: 'fraud-10', source: 'user-9', target: 'merchant-8', label: '$980.00', weight: 8.1, type: 'transaction', isFraud: true },
    
    // Multiple transactions from same users (legitimate)
    { id: 'txn-16', source: 'user-1', target: 'merchant-2', label: '$45.20', weight: 6.7, type: 'transaction', isFraud: false },
    { id: 'txn-17', source: 'user-2', target: 'merchant-8', label: '$67.89', weight: 7.0, type: 'transaction', isFraud: false },
    { id: 'txn-18', source: 'user-6', target: 'merchant-10', label: '$1,890.50', weight: 9.4, type: 'transaction', isFraud: false },
    { id: 'txn-19', source: 'user-8', target: 'merchant-1', label: '$234.67', weight: 8.0, type: 'transaction', isFraud: false },
    { id: 'txn-20', source: 'user-13', target: 'merchant-5', label: '$56.78', weight: 6.9, type: 'transaction', isFraud: false },
    
    // P2P Transactions - Legitimate peer-to-peer transfers
    { id: 'p2p-1', source: 'user-1', target: 'user-2', label: '$50.00', weight: 7.0, type: 'p2p', isFraud: false },
    { id: 'p2p-2', source: 'user-2', target: 'user-3', label: '$25.50', weight: 6.5, type: 'p2p', isFraud: false },
    { id: 'p2p-3', source: 'user-4', target: 'user-6', label: '$120.00', weight: 7.8, type: 'p2p', isFraud: false },
    { id: 'p2p-4', source: 'user-6', target: 'user-7', label: '$75.25', weight: 7.2, type: 'p2p', isFraud: false },
    { id: 'p2p-5', source: 'user-8', target: 'user-1', label: '$200.00', weight: 8.0, type: 'p2p', isFraud: false },
    { id: 'p2p-6', source: 'user-10', target: 'user-11', label: '$35.75', weight: 6.8, type: 'p2p', isFraud: false },
    { id: 'p2p-7', source: 'user-11', target: 'user-13', label: '$90.00', weight: 7.5, type: 'p2p', isFraud: false },
    { id: 'p2p-8', source: 'user-13', target: 'user-14', label: '$45.50', weight: 6.9, type: 'p2p', isFraud: false },
    { id: 'p2p-9', source: 'user-14', target: 'user-1', label: '$160.00', weight: 7.9, type: 'p2p', isFraud: false },
    { id: 'p2p-10', source: 'user-3', target: 'user-4', label: '$85.30', weight: 7.3, type: 'p2p', isFraud: false },
    { id: 'p2p-11', source: 'user-7', target: 'user-8', label: '$110.75', weight: 7.6, type: 'p2p', isFraud: false },
    { id: 'p2p-12', source: 'user-2', target: 'user-10', label: '$67.40', weight: 7.1, type: 'p2p', isFraud: false },
    { id: 'p2p-13', source: 'user-6', target: 'user-14', label: '$95.80', weight: 7.4, type: 'p2p', isFraud: false },
    { id: 'p2p-14', source: 'user-1', target: 'user-11', label: '$42.60', weight: 6.7, type: 'p2p', isFraud: false },
    { id: 'p2p-15', source: 'user-4', target: 'user-8', label: '$155.25', weight: 7.8, type: 'p2p', isFraud: false },
    { id: 'p2p-16', source: 'user-10', target: 'user-13', label: '$28.90', weight: 6.4, type: 'p2p', isFraud: false },
    { id: 'p2p-17', source: 'user-3', target: 'user-7', label: '$73.15', weight: 7.0, type: 'p2p', isFraud: false },
    { id: 'p2p-18', source: 'user-11', target: 'user-2', label: '$189.50', weight: 8.1, type: 'p2p', isFraud: false },
    { id: 'p2p-19', source: 'user-14', target: 'user-6', label: '$61.25', weight: 6.9, type: 'p2p', isFraud: false },
    { id: 'p2p-20', source: 'user-8', target: 'user-3', label: '$134.70', weight: 7.7, type: 'p2p', isFraud: false },
    { id: 'p2p-21', source: 'user-2', target: 'user-4', label: '$98.35', weight: 7.5, type: 'p2p', isFraud: false },
    { id: 'p2p-22', source: 'user-7', target: 'user-10', label: '$52.80', weight: 6.8, type: 'p2p', isFraud: false },
    { id: 'p2p-23', source: 'user-13', target: 'user-1', label: '$76.45', weight: 7.2, type: 'p2p', isFraud: false },
    { id: 'p2p-24', source: 'user-6', target: 'user-11', label: '$143.90', weight: 7.9, type: 'p2p', isFraud: false },
    { id: 'p2p-25', source: 'user-1', target: 'user-14', label: '$39.60', weight: 6.6, type: 'p2p', isFraud: false },
    
    // GATHER FRAUD - Multiple users sending money to one fraudulent account
    { id: 'gather-1', source: 'user-1', target: 'user-5', label: '$500.00', weight: 8.5, type: 'p2p', isFraud: true },
    { id: 'gather-2', source: 'user-3', target: 'user-5', label: '$750.00', weight: 8.8, type: 'p2p', isFraud: true },
    { id: 'gather-3', source: 'user-6', target: 'user-5', label: '$1,200.00', weight: 9.2, type: 'p2p', isFraud: true },
    { id: 'gather-4', source: 'user-8', target: 'user-5', label: '$950.00', weight: 9.0, type: 'p2p', isFraud: true },
    { id: 'gather-5', source: 'user-10', target: 'user-5', label: '$680.00', weight: 8.7, type: 'p2p', isFraud: true },
    { id: 'gather-6', source: 'user-11', target: 'user-5', label: '$1,100.00', weight: 9.1, type: 'p2p', isFraud: true },
    { id: 'gather-7', source: 'user-14', target: 'user-5', label: '$825.00', weight: 8.9, type: 'p2p', isFraud: true },
    
    // SCATTER FRAUD - One fraudulent account sending money to multiple accounts
    { id: 'scatter-1', source: 'user-12', target: 'user-2', label: '$450.00', weight: 8.4, type: 'p2p', isFraud: true },
    { id: 'scatter-2', source: 'user-12', target: 'user-4', label: '$350.00', weight: 8.1, type: 'p2p', isFraud: true },
    { id: 'scatter-3', source: 'user-12', target: 'user-7', label: '$720.00', weight: 8.7, type: 'p2p', isFraud: true },
    { id: 'scatter-4', source: 'user-12', target: 'user-10', label: '$580.00', weight: 8.5, type: 'p2p', isFraud: true },
    { id: 'scatter-5', source: 'user-12', target: 'user-13', label: '$920.00', weight: 9.0, type: 'p2p', isFraud: true },
    { id: 'scatter-6', source: 'user-12', target: 'user-1', label: '$640.00', weight: 8.6, type: 'p2p', isFraud: true },
    
    // Additional GATHER pattern - Bot network collecting funds
    { id: 'gather-8', source: 'user-2', target: 'user-9', label: '$380.00', weight: 8.2, type: 'p2p', isFraud: true },
    { id: 'gather-9', source: 'user-4', target: 'user-9', label: '$520.00', weight: 8.5, type: 'p2p', isFraud: true },
    { id: 'gather-10', source: 'user-7', target: 'user-9', label: '$790.00', weight: 8.8, type: 'p2p', isFraud: true },
    { id: 'gather-11', source: 'user-11', target: 'user-9', label: '$650.00', weight: 8.6, type: 'p2p', isFraud: true },
    { id: 'gather-12', source: 'user-13', target: 'user-9', label: '$440.00', weight: 8.3, type: 'p2p', isFraud: true },
    
    // Additional SCATTER pattern - Bot distributing funds
    { id: 'scatter-7', source: 'user-15', target: 'user-3', label: '$310.00', weight: 8.0, type: 'p2p', isFraud: true },
    { id: 'scatter-8', source: 'user-15', target: 'user-6', label: '$485.00', weight: 8.4, type: 'p2p', isFraud: true },
    { id: 'scatter-9', source: 'user-15', target: 'user-8', label: '$670.00', weight: 8.7, type: 'p2p', isFraud: true },
    { id: 'scatter-10', source: 'user-15', target: 'user-14', label: '$390.00', weight: 8.1, type: 'p2p', isFraud: true },
    
    // Suspicious small transactions (potential card testing)
    { id: 'fraud-11', source: 'user-12', target: 'merchant-1', label: '$1.00', weight: 5.2, type: 'transaction', isFraud: true },
    { id: 'fraud-12', source: 'user-12', target: 'merchant-2', label: '$1.00', weight: 5.1, type: 'transaction', isFraud: true },
    { id: 'fraud-13', source: 'user-12', target: 'merchant-3', label: '$1.00', weight: 5.0, type: 'transaction', isFraud: true },
    { id: 'fraud-14', source: 'user-15', target: 'merchant-5', label: '$0.50', weight: 4.8, type: 'transaction', isFraud: true },
    { id: 'fraud-15', source: 'user-15', target: 'merchant-6', label: '$0.50', weight: 4.9, type: 'transaction', isFraud: true },
  ],
};

export async function GET(request: NextRequest) {
  try {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const nodeTypes = searchParams.get('nodeTypes')?.split(',');
    const maxNodes = parseInt(searchParams.get('maxNodes') || '0');
    const includeMetadata = searchParams.get('includeMetadata') === 'true';

    let filteredData = { ...sampleNetworkData };

    // Apply node type filtering
    if (nodeTypes && nodeTypes.length > 0) {
      filteredData.nodes = filteredData.nodes.filter(node =>
        !node.type || nodeTypes.includes(node.type)
      );
      
      const nodeIds = new Set(filteredData.nodes.map(node => node.id));
      filteredData.edges = filteredData.edges.filter(edge =>
        nodeIds.has(edge.source) && nodeIds.has(edge.target)
      );
    }

    // Apply max nodes filtering
    if (maxNodes > 0 && filteredData.nodes.length > maxNodes) {
      filteredData.nodes = filteredData.nodes.slice(0, maxNodes);
      
      const nodeIds = new Set(filteredData.nodes.map(node => node.id));
      filteredData.edges = filteredData.edges.filter(edge =>
        nodeIds.has(edge.source) && nodeIds.has(edge.target)
      );
    }

    const response = {
      success: true,
      data: filteredData,
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        nodeCount: filteredData.nodes.length,
        edgeCount: filteredData.edges.length,
        ...(includeMetadata && {
          density: filteredData.edges.length / (filteredData.nodes.length * (filteredData.nodes.length - 1) / 2),
          nodeTypes: filteredData.nodes.reduce((acc, node) => {
            const type = node.type || 'default';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        }),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in network API:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch network data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const networkData = await request.json();

    // Validate the network data structure
    if (!networkData.nodes || !Array.isArray(networkData.nodes) ||
        !networkData.edges || !Array.isArray(networkData.edges)) {
      return NextResponse.json(
        { success: false, message: 'Invalid network data structure' },
        { status: 400 }
      );
    }

    // Validate nodes
    for (const node of networkData.nodes) {
      if (!node.id || !node.label) {
        return NextResponse.json(
          { success: false, message: 'Invalid node structure: missing id or label' },
          { status: 400 }
        );
      }
    }

    // Validate edges
    const nodeIds = new Set(networkData.nodes.map((n: any) => n.id));
    for (const edge of networkData.edges) {
      if (!edge.id || !edge.source || !edge.target) {
        return NextResponse.json(
          { success: false, message: 'Invalid edge structure: missing id, source, or target' },
          { status: 400 }
        );
      }
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        return NextResponse.json(
          { success: false, message: 'Invalid edge: references non-existent node' },
          { status: 400 }
        );
      }
    }

    // In a real application, you would save this data to your backend
    console.log('Received network data:', {
      nodeCount: networkData.nodes.length,
      edgeCount: networkData.edges.length,
    });

    return NextResponse.json({
      success: true,
      message: 'Network data uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading network data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to upload network data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}