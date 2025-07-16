import { MainLayout } from '@/components/layouts/main-layout';
import { ColorPaletteGenerator } from '@/components/color-palette/color-palette-generator';

export default function Home() {
  return (
    <MainLayout>
      <ColorPaletteGenerator />
    </MainLayout>
  );
}