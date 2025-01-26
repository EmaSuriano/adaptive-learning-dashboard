import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useStore } from "./lib/store";

const UserSettingsDialog = () => {
  const { settings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setOpen(false);
  };

  return (
    <>
      <Button size="icon" onClick={() => setOpen(true)}>
        <Settings size={24} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={localSettings.name}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nativeLanguage">Native Language</Label>
              <Input
                id="nativeLanguage"
                value={localSettings.nativeLanguage}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    nativeLanguage: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetLanguage">Target Language</Label>
              <Input
                id="targetLanguage"
                value={localSettings.targetLanguage}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    targetLanguage: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proficiencyLevel">Proficiency Level</Label>
              <Input
                id="proficiencyLevel"
                value={localSettings.proficiencyLevel}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    proficiencyLevel: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSettingsDialog;
