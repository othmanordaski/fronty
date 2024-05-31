import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserRoleTabs({ onChange }) {
    const handleTabChange = (value) => {
      switch (value) {
        case 'clients':
          onChange('user');
          break;
        case 'restaurants':
          onChange('restaurant');
          break;
        case 'delivery':
          onChange('delivery');
          break;
        default:
          onChange('user');
      }
    };
  
    return (
      <Tabs defaultValue="clients" className="w-[400px] mt-2" onValueChange={handleTabChange}>
        <TabsList className='border-solid  bg-lime-600 text-white rounded-[5px]'>
          <TabsTrigger className='rounded-[5px]' value="clients">Clients</TabsTrigger>
          <TabsTrigger className='rounded-[5px]' value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger className='rounded-[5px]' value="delivery">Delivery Man</TabsTrigger>
        </TabsList>
        <TabsContent value="clients"></TabsContent>
        <TabsContent value="restaurants"></TabsContent>
        <TabsContent value="delivery"></TabsContent>
      </Tabs>
    );
  }