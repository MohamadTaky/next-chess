import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

type ErrorCardProps = {
  error: string | null;
  reset: () => void;
};

export default function ErrorCard({ error, reset }: ErrorCardProps) {
  return (
    <AnimatePresence>
      {error && (
        <Card key="errorCard" asChild className="mx-auto w-fit space-y-2 rounded-t-none p-2 text-red-500">
          <motion.div
            initial={{ opacity: 0, translateY: "-100%" }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: "-100%" }}
          >
            <div className="flex items-center gap-2">
              <AlertCircle size="36" />
              <p className="mr-auto">{error}</p>
            </div>
            <Button onClick={reset} variant="ghost" className="mx-auto">
              {error}
            </Button>
          </motion.div>
        </Card>
      )}
    </AnimatePresence>
  );
}
