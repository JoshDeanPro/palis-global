const fs = require('fs');
const path = require('path');

const stylesDir = 'src/styles';
if (fs.existsSync(stylesDir)) {
    const files = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));
    
    files.forEach(file => {
        const filePath = path.join(stylesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Desaturate gold and blood red tokens
        const replacements = [
            [/197,\s*160,\s*89/g, '140, 140, 140'], // Muted Silver
            [/#c5a059/g, '#cdcdcd'],                // Bright Silver
            [/#d4af37/g, '#ffffff'],                // White
            [/#8b1c31/g, '#666666'],                // Dark Grey
            [/rgba\(197,\s*160,\s*89,\s*0\.8\)/g, 'rgba(200, 200, 200, 0.4)'],
            [/rgba\(197,\s*160,\s*89,\s*0\.6\)/g, 'rgba(200, 200, 200, 0.3)'],
            [/rgba\(197,\s*160,\s*89,\s*0\.3\)/g, 'rgba(200, 200, 200, 0.15)'],
            [/rgba\(197,\s*160,\s*89,\s*0\.14\)/g, 'rgba(200, 200, 200, 0.08)'],
            [/rgba\(197,\s*160,\s*89,\s*0\.12\)/g, 'rgba(200, 200, 200, 0.06)'],
            [/rgba\(197,\s*160,\s*89,\s*0\.1\)/g, 'rgba(200, 200, 200, 0.05)'],
            [/rgba\(139,\s*28,\s*49,\s*0\.3\)/g, 'rgba(100, 100, 100, 0.15)']
        ];

        replacements.forEach(([regex, repl]) => {
            content = content.replace(regex, repl);
        });

        fs.writeFileSync(filePath, content);
        console.log(`Desaturated ${file}`);
    });
}
